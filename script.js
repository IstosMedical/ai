const form = document.getElementById("serviceForm");
const resultDiv = document.getElementById("result");
const solutionText = document.getElementById("solution");

// Replace with your Google Apps Script deployed URL
const GAS_URL = "https://script.google.com/macros/s/AKfycbzZPXJSEuPrS05gZLQ2yyy3Q7NdLSFuok58ShoJm2vArsmfgPNI0hjcDNUngYB7Fr7P/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const machine = document.getElementById("machine").value;
  const errorCode = document.getElementById("errorCode").value;
  const description = document.getElementById("description").value;

  const data = {
    machine,
    errorCode,
    description
  };

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    solutionText.innerText = result.solution;
    resultDiv.style.display = "block";

  } catch (error) {
    solutionText.innerText = "Error fetching AI solution. Try again later.";
    resultDiv.style.display = "block";
  }
});

