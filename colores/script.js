const container = document.getElementById("color-container");

let lastScrollTop = 0; // Rastrea la posición previa del scroll
let currentColor = { r: 255, g: 0, b: 0 }; // Color inicial (rojo)

// Genera un nuevo color RGB de forma cíclica
function generateNewColor(scrollDirection) {
  const increment = scrollDirection === "down" ? 15 : -15; // Incremento basado en la dirección
  currentColor.r = (currentColor.r + increment + 256) % 256; // Evita valores fuera de rango
  currentColor.g = (currentColor.g + increment * Math.random() + 256) % 256;
  currentColor.b = (currentColor.b + increment * Math.random() + 256) % 256;
}

// Convierte un objeto de color RGB en una cadena CSS
function rgbToCss({ r, g, b }) {
  return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
}

// Maneja el evento de scroll
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const direction = scrollTop > lastScrollTop ? "down" : "up";
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  // Genera un nuevo bloque de color con un color suavemente interpolado
  generateNewColor(direction);
  const newBlock = document.createElement("div");
  newBlock.classList.add("color-block");
  newBlock.style.backgroundColor = rgbToCss(currentColor);

  // Añade el bloque al contenedor
  if (direction === "down") {
    container.appendChild(newBlock);
  } else if (container.childElementCount > 3) {
    container.removeChild(container.lastChild);
  }
});
