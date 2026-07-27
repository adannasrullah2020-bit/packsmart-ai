# ✈️ PackSmart AI

An AI powered travel packing assistant that generates personalized packing checklists based on your trip details using Google Gemini AI.

---

## 🌍 Live Demo

🔗 https://packsmart-ai-beige.vercel.app/

---

# 📖 Problem Statement

Packing for a trip is often stressful and time consuming. Many travelers forget important items, pack unnecessary belongings, or fail to prepare for different weather conditions, cultural expectations, transportation methods, and trip durations.

Creating a packing checklist manually takes time and often results in missed essentials, especially for international travel.

---

# 💡 Solution

PackSmart AI is an intelligent travel packing assistant that automatically generates a personalized packing checklist using Google's Gemini AI.

Instead of using a generic checklist, the application analyzes the user's travel information and produces recommendations specific to the destination and travel requirements.

The application is designed for:

- Solo travelers
- Families
- Business travelers
- Vacation travelers
- Students
- Pilgrims travelling for Umrah or Hajj
- Anyone who wants to pack efficiently without forgetting essential items

---

# ✨ Features

PackSmart AI includes the following features:

- AI powered packing checklist generation
- Personalized recommendations based on destination
- Trip duration analysis
- Weather based recommendations
- Travel purpose selection
- Transportation based suggestions
- Budget aware recommendations
- Travel summary generation
- Organized checklist categories
- Destination specific travel tips
- Packing tips
- Things you might forget section
- Copy checklist to clipboard
- Download checklist as PDF
- Responsive design for desktop, tablet, and mobile devices
- Modern travel themed user interface
- Clean and easy to use form validation

---

# 🤖 AI Feature

PackSmart AI uses Google's Gemini AI to dynamically generate a customized travel packing checklist.

The application creates a prompt using the user's travel information and sends it to the Gemini API through a secure backend endpoint.

The AI understands:

- Destination
- Number of travel days
- Weather
- Travel purpose
- Transportation
- Budget

It then generates a structured checklist with practical recommendations.

## System Prompt

```text
You are PackSmart AI.
You are a professional travel assistant.

Generate a personalized packing checklist based on:

Destination: [User Input]
Trip duration: [User Input]
Weather: [User Input]
Travel purpose: [User Input]
Transportation: [User Input]
Budget: [User Input]

Return the answer using these headings:

Travel Summary
Essential Clothing
Footwear
Toiletries
Electronics
Travel Documents
Health Items
Food and Snacks
Optional Items
Things You Might Forget
Local Travel Tips
Packing Tips

Rules:

Keep answers concise.

Suggest realistic quantities.

Make recommendations based on weather.

Give destination specific advice.

Return checklist items using checkbox symbols.
```

---

# 🛠 Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)

### Backend

- Vercel Serverless Functions
- Node.js

### AI Model

- Google Gemini 2.5 Flash

### APIs

- Google Gemini API inside vercel environment variables

### Deployment

- Vercel

### Other Libraries

- Font Awesome
- jsPDF
- html2canvas

---

---

# 📂 Project Structure

```
PackSmart-AI
│
├── api
│   └── generate.js
── style.css
── script.js
├── index.html
└── README.md
```

---

# 🎯 Example Use Case

### User Input

- Destination: Makkah
- Trip Duration: 25 Days
- Weather: Hot
- Purpose: Family Trip
- Transportation: Flight
- Budget: High

### AI Output

The application generates:

- Travel Summary
- Essential Clothing
- Footwear
- Toiletries
- Electronics
- Travel Documents
- Health Items
- Food and Snacks
- Optional Items
- Things You Might Forget
- Local Travel Tips
- Packing Tips

The checklist is personalized specifically for the selected destination and travel conditions.

---

# 👨‍💻 Author

Developed by Adan Nasrullah

BS Computer Science

University of Education

---
