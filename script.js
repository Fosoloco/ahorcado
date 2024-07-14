async function mostrarSignificado() {
    const palabra = document.getElementById('palabra').value;  // Obtener la palabra del input
    const meaningElement = document.getElementById('meaning'); // Elemento donde se mostrará el significado

    // Definir la URL de la API de la RAE para buscar la definición de una palabra en español
    const apiURL = `https://dle.rae.es/${encodeURIComponent(palabra)}.json`;

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('No se pudo obtener el significado');
        }
        const data = await response.json();
        const significado = data[0].meanings[0].definitions[0];  // Extraer la primera definición del JSON

        // Mostrar significado
        meaningElement.textContent = `El significado de "${palabra}" es: ${significado}`;
    } catch (error) {
        meaningElement.textContent = `Error: ${error.message}`;
    }
}
