const input = document.getElementById("foodInput");
const button = document.getElementById("askBtn");
const responseDiv = document.getElementById("response");

// Replace with your Render backend URL
const BACKEND_URL = "https://calorie-api-backend.onrender.com/api/gemini";

button.addEventListener("click", async () => {
  const prompt = input.value.trim();
  if (!prompt) return alert("Enter a food item!");

  responseDiv.textContent = "Thinking... 🍏";

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: `Estimate calories for: ${prompt}` }),
    });
    const data = await res.json();
    
    if (data.error) {
      responseDiv.textContent = "Error: " + data.error;
    } else if (data.candidates) {
      responseDiv.textContent = data.candidates.map(c => c.content[0].text).join("\n");
    } else {
      responseDiv.textContent = JSON.stringify(data, null, 2);
    }
  } catch (err) {
    responseDiv.textContent = "Fetch error: " + err.message;
  }
});
