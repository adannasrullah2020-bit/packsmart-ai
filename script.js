document.addEventListener("DOMContentLoaded", () => {
  // Safety check to ensure config.js is linked in the HTML and loaded
  if (typeof config === "undefined" || !config.API_KEY) {
    console.error(
      "Configuration missing! Please ensure config.js is linked in your index.html and contains API_KEY.",
    );
  }

  const GEMINI_API_KEY = typeof config !== "undefined" ? config.API_KEY : "";

  // DOM Elements
  const form = document.getElementById("packing-form");
  const destInput = document.getElementById("destination");
  const charCount = document.getElementById("char-count");
  const errorMessage = document.getElementById("error-message");
  const loadingSpinner = document.getElementById("loading-spinner");
  const resultSection = document.getElementById("result-section");
  const aiResponseContent = document.getElementById("ai-response-content");
  const currentDateEl = document.getElementById("current-date");

  // Buttons
  const btnCopy = document.getElementById("btn-copy");
  const btnPdf = document.getElementById("btn-pdf");
  const btnClear = document.getElementById("btn-clear");

  // Set Current Date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  currentDateEl.textContent = new Date().toLocaleDateString("en-US", options);

  // Character Counter for Destination
  destInput.addEventListener("input", (e) => {
    const length = e.target.value.length;
    charCount.textContent = length;
    if (length === 50) {
      charCount.style.color = "#ef4444";
    } else {
      charCount.style.color = "var(--text-muted)";
    }
  });

  // Form Submission handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Hide previous errors/results
    errorMessage.classList.add("hidden");
    resultSection.classList.add("hidden");

    // Get Values
    const destination = document.getElementById("destination").value.trim();
    const days = document.getElementById("days").value;
    const weather = document.getElementById("weather").value;
    const purpose = document.getElementById("purpose").value;
    const transport = document.getElementById("transport").value;
    const budget = document.getElementById("budget").value;

    // Validation
    if (
      !destination ||
      !days ||
      !weather ||
      !purpose ||
      !transport ||
      !budget
    ) {
      errorMessage.classList.remove("hidden");
      return;
    }

    // Show Loader
    form.classList.add("hidden");
    loadingSpinner.classList.remove("hidden");

    // Prepare Prompt for Gemini
    const systemPrompt = `You are PackSmart AI.
You are a professional travel assistant.
Generate a personalized packing checklist based on:
Destination: ${destination}
Trip duration: ${days} days
Weather: ${weather}
Travel purpose: ${purpose}
Transportation: ${transport}
Budget: ${budget}

Return the answer using exactly these headings:
## Travel Summary
## Essential Clothing
## Footwear
## Toiletries
## Electronics
## Travel Documents
## Health Items
## Food and Snacks
## Optional Items
## Things You Might Forget
## Local Travel Tips
## Packing Tips

Rules:
Keep answers concise.
Suggest realistic quantities based on the ${days} days duration.
Make recommendations based on ${weather} weather.
Give destination specific advice for ${destination}.
Return ALL checklist items using checkbox symbols like '✅' or '[ ]'.`;

    try {
      // Call Gemini API
      const responseText = await fetchGeminiResponse(systemPrompt);

      // Format and Display Response
      aiResponseContent.innerHTML = formatMarkdown(responseText);

      // UI Updates
      loadingSpinner.classList.add("hidden");
      resultSection.classList.remove("hidden");
      form.classList.remove("hidden");

      // Smooth scroll to results
      resultSection.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      loadingSpinner.classList.add("hidden");
      form.classList.remove("hidden");
      errorMessage.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Error: ${error.message}. Make sure your API key in config.js is correct!`;
      errorMessage.classList.remove("hidden");
    }
  });

  // Fetch call to Gemini API using standard REST payload
  async function fetchGeminiResponse(prompt) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      throw new Error("API Key is missing or invalid. Please update config.js");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error.message || "Failed to generate checklist");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  // Improved Markdown Parser (Handles headers, bold, italics, paragraphs, and unordered lists)
  function formatMarkdown(text) {
    let html = text
      // Replace ### Headings
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      // Replace ## Headings
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      // Replace **Bold**
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Replace *Italics*
      .replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Process lines for paragraphs and lists
    const lines = html.split("\n");
    let inList = false;
    let result = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return; // Skip empty lines

      // If line is a heading (already processed to HTML above)
      if (trimmed.startsWith("<h")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(trimmed);
        return;
      }

      // Check if line is a list item (Starts with ✅, [ ], *, or -)
      const isListItem = /^[*\-✅]/.test(trimmed) || trimmed.startsWith("[ ]");

      if (isListItem) {
        if (!inList) {
          result.push("<ul>");
          inList = true;
        }
        result.push(`<li>${trimmed}</li>`);
      } else {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<p>${trimmed}</p>`);
      }
    });

    // Close list if it was the last element
    if (inList) result.push("</ul>");

    return result.join("\n");
  }

  // --- Action Buttons Functionality ---

  // Copy to Clipboard
  btnCopy.addEventListener("click", () => {
    // Create a temporary textarea to hold un-HTML-ified text
    const tempElement = document.createElement("div");
    tempElement.innerHTML = aiResponseContent.innerHTML;
    const plainText = tempElement.innerText;

    navigator.clipboard.writeText(plainText).then(() => {
      const originalText = btnCopy.innerHTML;
      btnCopy.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
      setTimeout(() => (btnCopy.innerHTML = originalText), 2000);
    });
  });

  // Download PDF (Using browser Print functionality via CSS @media print)
  btnPdf.addEventListener("click", () => {
    window.print();
  });

  // Clear Form & Results
  btnClear.addEventListener("click", () => {
    form.reset();
    charCount.textContent = "0";
    charCount.style.color = "var(--text-muted)";
    resultSection.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
