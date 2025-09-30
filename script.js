// ✅ Your backend URL
const BACKEND_URL = "https://cal-count-backend-1.onrender.com/api/gemini";


// Optional: fallback CORS proxy if needed
// const BACKEND_URL = "https://cors-anywhere.herokuapp.com/https://cal-count-backend.onrender.com/api/gemini";

// Include your Gemini API key here
const GEMINI_API_KEY = "AIzaSyCjJh9O908yFWMBnTst196RsmGmbfA8oZw";

const foodInput = document.getElementById("foodInput");
const askBtn = document.getElementById("askBtn");
const responsesDiv = document.getElementById("responses");

askBtn.addEventListener("click", async () => {
  const food = foodInput.value.trim();
  if (!food) return alert("Please enter a food item!");

  // Show temporary message
  const tempDiv = document.createElement("div");
  tempDiv.className = "response";
  tempDiv.textContent = `Fetching info for "${food}"...`;
  responsesDiv.prepend(tempDiv);

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({ prompt: food })
    });

    if (!res.ok) throw new Error(`Server returned ${res.status}`);

    const data = await res.json();
    tempDiv.textContent = data.message || JSON.stringify(data);

  } catch (err) {
    tempDiv.textContent = `Error: ${err.message}`;
  }
});
