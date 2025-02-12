import { buildFinanceArray } from "./financemath";
function buildHeader() {
  const header = document.getElementById("header");
  const title = document.createElement("h1");

  title.innerHTML = "Crypto and Stock Tracker";
  header.appendChild(title);
}
function buildFooter() {
  const footer = document.getElementById("footer");
  const copywrite = document.createElement("p");
  const date = new Date();
  const year = date.getFullYear();
  copywrite.innerHTML = `©${year} Jaden Binette`;
  footer.appendChild(copywrite);
}
export function buildPage() {
  buildHeader();
  buildFooter();
}

// Function to draw a line graph with color coding
export function drawLineGraph(canvas, xValues, yValues) {
  const ctx = canvas.getContext("2d");

  // Set the canvas width and height
  const width = canvas.width;
  const height = canvas.height;

  // Define the margins
  const marginLeft = 70;
  const marginRight = 70;
  const marginTop = 30;
  const marginBottom = 70;

  // Find the maximum and minimum values for scaling the graph
  const maxX = Math.max(...xValues);
  const minX = Math.min(...xValues);
  const maxY = Math.max(...yValues);
  const minY = Math.min(...yValues);

  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  // Draw the x and y axes
  ctx.beginPath();
  ctx.moveTo(marginLeft, marginTop);
  ctx.lineTo(marginLeft, height - marginBottom);
  ctx.lineTo(width - marginRight, height - marginBottom);
  ctx.stroke();

  // Label the x and y axes
  ctx.font = "30px Arial";
  ctx.fillText("Date", (width - marginLeft) / 2, height - marginBottom + 40);
  ctx.save();
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Price (USD)", -(height - marginTop) / 2, marginLeft - 40);
  ctx.restore();

  // Draw the line graph with color coding
  for (let i = 1; i < xValues.length; i++) {
    const x1 = marginLeft + ((xValues[i - 1] - minX) / (maxX - minX)) * (width - marginLeft - marginRight);
    const y1 =
      height - marginBottom - ((yValues[i - 1] - minY) / (maxY - minY)) * (height - marginTop - marginBottom);
    const x2 = marginLeft + ((xValues[i] - minX) / (maxX - minX)) * (width - marginLeft - marginRight);
    const y2 =
      height - marginBottom - ((yValues[i] - minY) / (maxY - minY)) * (height - marginTop - marginBottom);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    // Set the stroke style based on the price change
    if (yValues[i] >= yValues[i - 1]) {
      ctx.strokeStyle = "green"; // Price increasing
    } else {
      ctx.strokeStyle = "red"; // Price decreasing
    }

    ctx.stroke();
  }

  // Draw the x values (dates) with some spacing
  const labelSpacing = Math.floor(xValues.length / 10);
  for (let i = 0; i < xValues.length; i += labelSpacing) {
    const x = marginLeft + ((xValues[i] - minX) / (maxX - minX)) * (width - marginLeft - marginRight);
    ctx.fillText(new Date(xValues[i]).toLocaleDateString(), x - 5, height - marginBottom + 20);
  }

  // Draw the y values (prices) with proper spacing
  const yLabelSpacing = Math.floor((maxY - minY) / 5);
  for (let i = minY; i <= maxY; i += yLabelSpacing) {
    const y = height - marginBottom - ((i - minY) / (maxY - minY)) * (height - marginTop - marginBottom);
    ctx.fillText(i.toFixed(2), marginLeft - 40, y + 5);
  }
}


function buildInfoDiv(item) {
  const infodiv = `<a href="/search?search=${item.id}">
                <div class="info">
                    <h2>${item.id}</h2>
                    <p>Symbol: ${item.symbol}</p>
                    <p>Market Cap: ${item.marketcap}</p>
                    <p>price: ${item.priceper}</p>
                    <p>Percent change 24h: ${item.percentdaychange}</p>
                </div>
                </a>`;

  return infodiv;
}

// Function to add the fade-in effect when the element is in the viewport
function addFadeInEffect() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // Stop observing once the element is visible
      }
    });
  });

  const infoElements = document.querySelectorAll(".info");
  infoElements.forEach((element) => {
    observer.observe(element);
  });
}

function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn); // Ensure list is an array
  if (clear) {
    parentElement.innerHTML = ""; // Clear previous content
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function buildDetailsGrid(element) {
  try {
    const list = await buildFinanceArray(); // Await the Promise to get the array
    renderListWithTemplate(buildInfoDiv, element, list);
    addFadeInEffect();
  } catch (error) {
    console.error("Error building details grid:", error);
  }
}
