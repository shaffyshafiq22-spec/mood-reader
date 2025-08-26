import json
import os
from typing import Any, Dict, Optional

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Optional OpenAI import guarded for environments without API key
try:
	from openai import OpenAI  # type: ignore
except Exception:  # pragma: no cover
	OpenAI = None  # type: ignore


load_dotenv()

app = Flask(__name__)
CORS(app)

DATASET_PATH = os.path.join(os.path.dirname(__file__), 'dataset.json')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_MODEL = os.getenv('OPENAI_MODEL', 'gpt-4o-mini')


def load_dataset() -> Dict[str, Any]:
	if not os.path.exists(DATASET_PATH):
		raise FileNotFoundError(f"dataset.json not found at {DATASET_PATH}")
	with open(DATASET_PATH, 'r', encoding='utf-8') as f:
		return json.load(f)


def lookup_from_dataset(mood_slug: str) -> Optional[Dict[str, Any]]:
	"""Try to find a response for the mood in the local dataset.

	The dataset is organized under language buckets. Here we try both urdu and english.
	"""
	dataset = load_dataset()
	for bucket in ('urdu', 'english'):
		bucket_map = dataset.get(bucket, {})
		if mood_slug in bucket_map:
			return bucket_map[mood_slug]
	return None


def build_prompt_for_openai(mood: str) -> str:
	return (
		f"User is feeling: {mood}\n\n"
		"Please provide a relevant Quran verse or authentic Hadith for this emotional state.\n\n"
		"Return response in this EXACT JSON format:\n"
		"{\n"
		"  \"type\": \"verse\" or \"hadith\",\n"
		"  \"arabic\": \"[Arabic text]\",\n"
		"  \"urdu\": \"[Urdu translation]\",\n"
		"  \"reference\": \"[Surah/Hadith reference]\",\n"
		"  \"explanation\": \"[2-line explanation in Urdu about relevance to the mood]\"\n"
		"}\n\n"
		"Requirements:\n"
		"- Only authentic Quran verses or Sahih Hadiths\n"
		"- Urdu explanation should be exactly 2 lines\n"
		"- Reference must be accurate\n"
		"- Response must be valid JSON"
	)


def generate_with_openai(mood: str) -> Optional[Dict[str, Any]]:
	if not OPENAI_API_KEY or OpenAI is None:
		return None
	try:
		client = OpenAI(api_key=OPENAI_API_KEY)
		prompt = build_prompt_for_openai(mood)
		# Use chat.completions with structured JSON output
		response = client.chat.completions.create(
			model=OPENAI_MODEL,
			messages=[
				{"role": "system", "content": "You are a knowledgeable Islamic assistant who responds with authentic references only."},
				{"role": "user", "content": prompt},
			],
			response_format={"type": "json_object"},
			temperature=0.2,
		)
		content = response.choices[0].message.content or "{}"
		data = json.loads(content)
		# Basic validation
		if not all(k in data for k in ("type", "arabic", "urdu", "reference", "explanation")):
			return None
		return data
	except Exception as e:  # pragma: no cover
		print(f"OpenAI error: {e}")
		return None


@app.route('/api/health', methods=['GET'])
def health():
	return jsonify({"status": "ok"})


@app.route('/api/get_verse', methods=['POST'])
def get_verse():
	try:
		payload = request.get_json(silent=True) or {}
		mood = (payload.get('mood') or '').strip()
		if not mood:
			return jsonify({"error": "Missing 'mood' in JSON body"}), 400

		# Try dataset first using slug if provided
		mood_slug = mood.lower()
		local = lookup_from_dataset(mood_slug)
		if local:
			return jsonify(local)

		# Fallback to OpenAI with the original mood string
		ai = generate_with_openai(mood)
		if ai:
			return jsonify(ai)

		# Final fallback if AI unavailable
		return jsonify({
			"type": "verse",
			"arabic": "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
			"urdu": "بے شک مشکل کے ساتھ آسانی ہے۔",
			"reference": "سورۃ الشرح 94:6",
			"explanation": "مشکل گھڑی میں صبر اور یقین رکھیں۔\nاللہ آسانی عطا فرماتا ہے۔",
		}), 200
	except Exception as e:
		print(f"/api/get_verse error: {e}")
		return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
	port = int(os.getenv('PORT', '5001'))
	app.run(host='0.0.0.0', port=port, debug=True)