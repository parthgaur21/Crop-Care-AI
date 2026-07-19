import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const predictDisease = async () => {
    if (!image) {
      alert("Please upload a plant leaf image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Prediction Failed!");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("CropCare AI Report", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("AI Powered Crop Disease Prediction", 20, 30);

    doc.line(20, 36, 190, 36);

    doc.setFont("helvetica", "bold");
    doc.text("Disease:", 20, 48);
    doc.setFont("helvetica", "normal");
    doc.text(result.disease || "-", 70, 48);

    doc.setFont("helvetica", "bold");
    doc.text("Confidence:", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.text(result.confidence || "-", 70, 60);

    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, 75);
    doc.setFont("helvetica", "normal");

    const desc = doc.splitTextToSize(
      result.description || "-",
      160
    );
    doc.text(desc, 20, 85);

    let y = 85 + desc.length * 7 + 8;

    doc.setFont("helvetica", "bold");
    doc.text("Treatment:", 20, y);

    doc.setFont("helvetica", "normal");

    const treat = doc.splitTextToSize(
      result.treatment || "-",
      160
    );

    doc.text(treat, 20, y + 10);

    y += treat.length * 7 + 18;

    doc.setFont("helvetica", "bold");
    doc.text("Prevention:", 20, y);

    doc.setFont("helvetica", "normal");

    const prev = doc.splitTextToSize(
      result.prevention || "-",
      160
    );

    doc.text(prev, 20, y + 10);

    y += prev.length * 7 + 20;

    doc.line(20, y, 190, y);

    y += 10;

    doc.setFontSize(11);

    doc.text(
      "Generated on : " + new Date().toLocaleString(),
      20,
      y
    );

    doc.text(
      "Powered by Google Gemini AI",
      20,
      y + 8
    );

    doc.save("CropCare_Report.pdf");
  };

  return (
    <div className="container">
      <div className="card">

        <h1 className="title">🌿 CropCare AI</h1>

        <p className="subtitle">
          AI Powered Crop Disease Prediction using Google Gemini
        </p>

        <div className="upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          <p className="upload-text">
            Upload a clear image of a plant leaf
          </p>
        </div>

        {preview && (
          <img
            src={preview}
            alt="Leaf Preview"
            className="preview"
          />
        )}

        <button
          onClick={predictDisease}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "🔍 Analyze Crop"}
        </button>

        <p className="note">
          Supported: Tomato, Potato, Rice, Wheat,
          Corn, Cotton and many common crops.
        </p>

        {loading && (
          <div className="loading">

            <div className="loader"></div>

            <h2>Analyzing Leaf...</h2>

            <p>
              Google Gemini AI is examining your crop.
            </p>

          </div>
        )}

        {result && (
          <div className="result">

            <h2>
              🌱 Disease : {result.disease}
            </h2>

            <div
              className={
                result.disease
                  .toLowerCase()
                  .includes("healthy")
                  ? "status healthy"
                  : "status infected"
              }
            >
              {result.disease
                .toLowerCase()
                .includes("healthy")
                ? "🟢 Healthy Plant"
                : "🔴 Disease Detected"}
            </div>

            <h3>
              🎯 Confidence : {result.confidence}
            </h3>

            <div className="progress">
              <div
                className="progress-fill"
                style={{
                  width: result.confidence?.includes("%")
                    ? result.confidence
                    : `${result.confidence || 0}%`,
                }}
              ></div>
            </div>

            <div className="info-card">
              <h4>📖 Description</h4>
              <p>{result.description}</p>
            </div>

            <div className="info-card">
              <h4>💊 Treatment</h4>
              <p>{result.treatment}</p>
            </div>

            <div className="info-card">
              <h4>🛡️ Prevention</h4>
              <p>{result.prevention}</p>
            </div>

            <button
              className="pdf-btn"
              onClick={downloadPDF}
            >
              📄 Download Report
            </button>

          </div>
        )}

        <div className="footer">
          Powered by <b>Google Gemini AI</b>
          <br />
          Created by <b>Parth Gaur</b>
        </div>

      </div>
    </div>
  );
}

export default App;