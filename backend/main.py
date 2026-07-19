import os
import json
from dotenv import load_dotenv

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from google import genai
from google.genai import types

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="CropCare AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "status": "Backend Running",
        "project": "CropCare AI"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    try:

        if not file.content_type.startswith("image/"):
            return JSONResponse(
                status_code=400,
                content={
                    "disease": "Unknown",
                    "confidence": "0%",
                    "description": "Uploaded file is not an image.",
                    "treatment": "Upload a valid plant leaf image.",
                    "prevention": "Use JPG, JPEG or PNG."
                }
            )

        image_bytes = await file.read()

        prompt = """
You are an expert agricultural plant pathologist.

Analyze ONLY the uploaded plant leaf image.

Return ONLY valid JSON.

{
"disease":"",
"confidence":"",
"description":"",
"treatment":"",
"prevention":""
}

Rules:

1. If the leaf looks healthy, disease should be "Healthy Leaf".

2. Confidence must always contain % sign.
Example:
"96%"

3. Keep every answer under 40 words.

4. Do not use markdown.

5. Do not explain outside JSON.

6. If image is not a plant leaf return

{
"disease":"Unknown",
"confidence":"0%",
"description":"Image is not a plant leaf.",
"treatment":"None",
"prevention":"Upload a clear plant leaf image."
}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                prompt,
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=file.content_type
                )
            ]
        )

        text = response.text.strip()

        if text.startswith("```"):
            text = (
                text.replace("```json", "")
                .replace("```", "")
                .strip()
            )

        try:
            result = json.loads(text)

        except Exception:

            result = {
                "disease": "Unknown",
                "confidence": "0%",
                "description": "AI returned an unexpected response.",
                "treatment": "Try another clear image.",
                "prevention": "Upload a well-lit plant leaf image."
            }

        return result

    except Exception as e:

        return JSONResponse(
            status_code=500,
            content={
                "disease": "Server Error",
                "confidence": "0%",
                "description": str(e),
                "treatment": "Please try again.",
                "prevention": "Check backend server and API key."
            }
        )