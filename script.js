const form = document.getElementById("serviceForm");
const resultDiv = document.getElementById("result");
const solutionText = document.getElementById("solution");

const GAS_URL = "https://script.google.com/macros/s/AKfycbzZPXJSEuPrS05gZLQ2yyy3Q7NdLSFuok58ShoJm2vArsmfgPNI0hjcDNUngYB7Fr7P/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const machine = document.getElementById("machine").value.trim();
  const errorCode = document.getElementById("errorCode").value.trim();
  const description = document.getElementById("description").value.trim();

  const payload = { machine, errorCode, description };

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const result = await response.json();
    solutionText.innerText = result.solution || "No solution returned.";
    resultDiv.style.display = "block";

  } catch (error) {
    console.error("Fetch error:", error);
    solutionText.innerText = "Error fetching AI solution. Try again later.";
    resultDiv.style.display = "block";
  }
});
