import { buildPage, buildDetailsGrid } from "./partialbuilder";
import { handleSearch } from "./search.js";
const xValues = [0, 1, 2, 3, 4, 5];
const yValues = [0, 1, 4, 9, 16, 25];
buildPage();

buildDetailsGrid(document.getElementById("gdiv"));

// Function to handle search navigation
function handleSearchNavigation() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    window.history.pushState(
      {},
      "",
      `/search?search=${encodeURIComponent(searchTerm)}`
    );
    // Run the search function immediately after changing the URL
    handleSearch(searchTerm);
  }
}

// Function to get query parameter value
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to handle URL changes
function handleUrlChange() {
  try {
    const searchTerm = getQueryParam("search");
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  } catch {
    console.log("search Error");
  }
}

const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB5bR4nX3bKHpA8kmqRicsQ-zHvyTCIBBE";
const data = {
  contents: [{
    parts: [{ text: "Explain how AI works" }]
  }]
};

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => console.log(result))
.catch(error => console.error("Error:", error));

// Add event listener to handle back/forward navigation
window.addEventListener("popstate", handleUrlChange);

// Initial check on page load
handleUrlChange();
