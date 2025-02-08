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
function drawLineGraph(canvas, xValues, yValues) {

    const ctx = canvas.getContext('2d');

    // Set the canvas width and height
    const width = canvas.width;
    const height = canvas.height;

    // Find the maximum values for scaling the graph
    const maxX = Math.max(...xValues);
    const maxY = Math.max(...yValues);

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the x and y axes
    ctx.beginPath();
    ctx.moveTo(50, 10);
    ctx.lineTo(50, height - 50);
    ctx.lineTo(width - 10, height - 50);
    ctx.stroke();

    // Label the x and y axes
    ctx.font = '12px Arial';
    ctx.fillText('X-Axis', width / 2, height - 10);
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Y-Axis', -height / 2, 20);
    ctx.restore();

    // Draw the line graph
    ctx.beginPath();
    ctx.moveTo(50 + (xValues[0] / maxX) * (width - 60), height - 50 - (yValues[0] / maxY) * (height - 60));

    for (let i = 1; i < xValues.length; i++) {
        const x = 50 + (xValues[i] / maxX) * (width - 60);
        const y = height - 50 - (yValues[i] / maxY) * (height - 60);
        ctx.lineTo(x, y);
    }

    ctx.stroke();

    // Draw the x values
    for (let i = 0; i < xValues.length; i++) {
        const x = 50 + (xValues[i] / maxX) * (width - 60);
        ctx.fillText(xValues[i], x - 5, height - 35);
    }

    // Draw the y values
    for (let i = 0; i < yValues.length; i++) {
        const y = height - 50 - (yValues[i] / maxY) * (height - 60);
        ctx.fillText(yValues[i], 30, y + 3);
    }
}



export function buildgraph(xValues, yValues) {
  const canvas = document.createElement('canvas')
  drawLineGraph(canvas, xValues, yValues)
  document.getElementById('gdiv').appendChild(canvas)
}
