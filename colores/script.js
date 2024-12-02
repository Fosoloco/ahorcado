const container = document.getElementById("color-container");

let lastScrollTop = 0; // Rastrea la posición previa del scroll
let currentColor = { r: 255, g: 0, b: 0 }; // Color inicial (rojo)

// Genera un nuevo color basado en la posición del scroll
function generateNewColor(scrollDirection) {
  const increment = 15; // Cambia el valor para un efecto más rápido o lento
  if (scrollDirection === "down") {
    currentColor.r = (currentColor.r + increment) % 256;
    currentColor.g = (currentColor.g + increment * 0.7) % 256;
    currentColor.b = (currentColor.b + increment * 0.5) % 256;
  } else {
    currentColor.r = (currentColor.r - increment + 256) % 256;
    currentColor.g = (currentColor.g - increment * 0.7 + 256) % 256;
    currentColor.b = (currentColor.b - increment * 0.5 + 256) % 256;
  }
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

  // Crea un nuevo bloque de color
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
