# 🌿 CropCare AI

> AI-Based Crop Disease Prediction System using **Google Gemini Vision**

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![Gemini](https://img.shields.io/badge/Google-Gemini%202.5%20Flash-orange?logo=google)
![License](https://img.shields.io/badge/License-MIT-success)

---

## 📖 About

CropCare AI is an AI-powered web application that helps identify crop diseases from plant leaf images using **Google Gemini Vision**.

Users simply upload a leaf image, and the application provides:

- 🌱 Disease Name
- 🎯 Confidence Score
- 📖 Disease Description
- 💊 Treatment Suggestions
- 🛡 Prevention Tips
- 📄 Downloadable PDF Report

---

## ✨ Features

- 📤 Upload Plant Leaf Image
- 🤖 AI Disease Detection
- 🎯 Confidence Score
- 📖 Disease Description
- 💊 Treatment Recommendation
- 🛡 Prevention Tips
- 📄 PDF Report Generation
- 📱 Responsive User Interface
- ⚡ Fast API Response
- 🌿 Clean Modern UI

---

# 🖥 Tech Stack

### Frontend

- React
- Vite
- Axios
- CSS

### Backend

- FastAPI
- Python

### Artificial Intelligence

- Google Gemini 2.5 Flash Vision API

### Other Tools

- jsPDF
- GitHub
- VS Code

---

# 🏗 Project Structure

```text
CropCare-AI/

│

├── backend/

│ ├── main.py

│ ├── .env

│ └── venv/

│

├── frontend/

│ ├── src/

│ ├── public/

│ ├── package.json

│ └── vite.config.js

│

└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/CropCare-AI.git
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install fastapi uvicorn python-dotenv google-genai python-multipart

uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🚀 Working

1. Upload Plant Leaf Image

2. Frontend sends image to FastAPI

3. FastAPI sends image to Google Gemini Vision

4. Gemini analyzes disease

5. JSON response is returned

6. Frontend displays:

- Disease
- Confidence
- Description
- Treatment
- Prevention

7. User can download PDF Report

---

# 📸 Screenshots

### Home Page

<img width="2560" height="1600" alt="Screenshot 2026-07-19 232928" src="https://github.com/user-attachments/assets/ff4a015b-639b-4201-8e30-914f8974ec46" />


### Prediction Result

<img width="1084" height="1022" alt="Screenshot 2026-07-19 234600" src="https://github.com/user-attachments/assets/32fe62b9-32bf-46bc-93a0-34af01b7f3b3" />


### PDF Report

<img width="2560" height="1600" alt="Screenshot 2026-07-19 234657" src="https://github.com/user-attachments/assets/9bf6b312-e1a6-41f4-8a7c-8dcddcfd0e18" />


---

# 🔮 Future Scope

- Mobile Application
- More Crop Dataset
- Multi-language Support
- Offline AI Model
- Camera Integration

---

# 👨‍💻 Developer

**Parth Gaur**

B.Tech Computer Science & Engineering

Pranveer Singh Institute of Technology (PSIT), Kanpur

Dr. A.P.J. Abdul Kalam Technical University (AKTU)

---

# 🎓 Internship

**IBM PBEL – GEN AI Batch 6**

Mentor

**Mr. Santosh Kumar Sir**

---

# ⭐ If you like this project, give it a Star!
