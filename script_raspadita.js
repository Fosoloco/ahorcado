document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("scratchCanvas");
    const ctx = canvas.getContext("2d");
    const overlayText = document.querySelector(".overlay-text");
    
    // Ajusta el tamaño del canvas al tamaño de su contenedor
    const container = document.querySelector(".scratch-container");
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Rellenar el canvas con un color gris
    ctx.fillStyle = "#b0b0b0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;
    let firstScratch = false;

    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function getTouchPos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.touches[0].clientX - rect.left,
            y: evt.touches[0].clientY - rect.top
        };
    }

    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    function hideText() {
        if (!firstScratch) {
            overlayText.style.display = 'none';
            firstScratch = true;
        }
    }

    // Calcular el porcentaje raspado del canvas
    function checkCompletion() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let totalPixels = imageData.width * imageData.height;
        let clearPixels = 0;

        // Contar los píxeles que están completamente despejados
        for (let i = 0; i < totalPixels * 4; i += 4) {
            if (imageData.data[i + 3] === 0) { // Comprobar si el píxel es transparente
                clearPixels++;
            }
        }

        let percent = (clearPixels / totalPixels) * 100;
        if (percent > 90) { // Si más del 90% del área está raspada
            window.location.href = "ganador_raspadita.html"; // Redirigir a la página del ganador
        }
    }

    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        const pos = getMousePos(canvas, e);
        scratch(pos.x, pos.y);
        hideText();
        checkCompletion(); // Comprobar el porcentaje raspado
    });

    canvas.addEventListener('mousemove', function(e) {
        if (isDrawing) {
            const pos = getMousePos(canvas, e);
            scratch(pos.x, pos.y);
            checkCompletion(); // Comprobar el porcentaje raspado
        }
    });

    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });

    canvas.addEventListener('touchstart', function(e) {
        isDrawing = true;
        const pos = getTouchPos(canvas, e);
        scratch(pos.x, pos.y);
        hideText();
        checkCompletion(); // Comprobar el porcentaje raspado
    });

    canvas.addEventListener('touchmove', function(e) {
        if (isDrawing) {
            const pos = getTouchPos(canvas, e);
            scratch(pos.x, pos.y);
            checkCompletion(); // Comprobar el porcentaje raspado
        }
    });

    canvas.addEventListener('touchend', function() {
        isDrawing = false;
    });
});
