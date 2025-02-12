import {drawLineGraph} from "./partialbuilder";

// Function to fetch data from the API based on the search term
export async function fetchData(searchTerm) {
    const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(searchTerm)}/market_chart?vs_currency=usd&days=10`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-HuPgNyAvUiAjLoVVKKko3AGu"
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async function getAIExplanation(query) {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB5bR4nX3bKHpA8kmqRicsQ-zHvyTCIBBE";
    const data = {
      contents: [{
        parts: [{ text: `Give summery on the crypto token ${query}` }]
      }]
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  

// Function to handle the search and build the result elements
export async function handleSearch(query) {
  const results = await fetchData(query);
  console.log(results);

  // Clear previous results
  const detailResults = document.getElementById("detailResults");
  detailResults.innerHTML = "";

  // Create and append an <h2> element with the search term
  const header = document.createElement("h2");
  header.innerHTML = query;
  detailResults.appendChild(header);
  detailResults.appendChild(document.createElement("br"));

  // Extract timestamps and prices for the graph
  const timestamps = results.prices.map(item => item[0]);
  const prices = results.prices.map(item => item[1]);

  // Create and append canvas element with fade-in animation
  const canvas = document.createElement("canvas");
  canvas.width = 2000;
  canvas.height = 1000;
  canvas.classList.add("fade-in"); // Add the fade-in class for animation
  drawLineGraph(canvas, timestamps, prices);
  detailResults.appendChild(canvas);

  // Fetch AI-generated summary and append to results
  const aiSummary = await getAIExplanation(query);
  if (aiSummary) {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = aiSummary.candidates[0].content.parts[0].text;
      detailResults.appendChild(paragraph);
  }

  // Make the parent div visible after appending the children
  detailResults.style.display = "flex";
}

