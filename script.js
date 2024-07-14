async function mostrarSignificado() {
    const palabra = document.getElementById('palabra').value;  // Obtener la palabra del input
    const meaningElement = document.getElementById('meaning'); // Elemento donde se mostrará el significado

    // Definir la URL de la API del diccionario
    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`;

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('No se pudo obtener el significado');
        }
        const data = await response.json();
        const significado = data[0].meanings[0].definitions[0].definition;  // Extraer el significado del JSON

        // Mostrar significado
        meaningElement.textContent = `El significado de "${palabra}" es: ${significado}`;
    } catch (error) {
        meaningElement.textContent = `Error: ${error.message}`;
    }
}
