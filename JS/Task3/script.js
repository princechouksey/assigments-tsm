const container = document.querySelector("#container");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  const r = Math.floor(Math.random() * 256); 
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Background of container
  container.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

  // Create another random color for gradient
  const r2 = Math.floor(Math.random() * 256);
  const g2 = Math.floor(Math.random() * 256);
  const b2 = Math.floor(Math.random() * 256);

  // Gradient on button
  button.style.background = `linear-gradient(to left, rgb(${r}, ${g}, ${b}), rgb(${r2}, ${g2}, ${b2}))`;
});
