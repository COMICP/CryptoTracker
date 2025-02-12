import { buildPage, buildDetailsGrid } from "./partialbuilder";
import { handleSearch } from "./search.js";
const xValues = [0, 1, 2, 3, 4, 5];
const yValues = [0, 1, 4, 9, 16, 25];
buildPage();

buildDetailsGrid(document.getElementById("gdiv"));


;

// Function to handle search navigation
function handleSearchNavigation() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    window.history.pushState({}, "", `/search?search=${encodeURIComponent(searchTerm)}`);
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
  const searchTerm = getQueryParam("search");
  if (searchTerm) {
    handleSearch(searchTerm);
  }
}

// Add event listener to handle back/forward navigation
window.addEventListener("popstate", handleUrlChange);

// Initial check on page load
handleUrlChange();