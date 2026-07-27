# PackSmart AI ✈️

## Problem Statement

Packing for a trip can be overwhelming. Travelers often forget essential items, overpack unnecessary gear, or fail to account for specific weather conditions, transportation limitations, and cultural nuances of their destination. Manual checklist creation is time-consuming and prone to human error.

## Solution

**PackSmart AI** is a responsive web application that leverages Google's Gemini AI to generate customized, comprehensive packing checklists. By taking into account the destination, trip duration, expected weather, purpose, transport type, and budget, the AI curates exactly what you need—nothing more, nothing less.

## Features

- 🌍 **Smart Inputs:** Specify destination, days, weather, purpose, and budget.
- 🤖 **AI-Powered:** Uses Google Gemini 1.5 Flash for rapid, intelligent checklist generation.
- 📋 **Structured Output:** Automatically categorizes items (Essentials, Toiletries, Electronics, etc.).
- 📱 **Responsive Design:** Works seamlessly on mobile, tablet, and desktop.
- 🖨️ **Export Options:** Instantly copy the list to clipboard or download/print as a PDF.
- ✨ **Modern UI:** Built with an attractive blue/green travel theme and smooth animations.

## AI Feature

The core logic of the application revolves around dynamically constructing a system prompt based on user input and sending it to the Gemini API.

### System Prompt

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

Return the answer using these headings.
Travel Summary, Essential Clothing, Footwear, Toiletries, Electronics, Travel Documents, Health Items, Food and Snacks, Optional Items, Things You Might Forget, Local Travel Tips, Packing Tips.

Rules: Keep answers concise. Suggest realistic quantities. Make recommendations based on weather. Give destination specific advice. Return checklist items using checkbox symbols.
```
