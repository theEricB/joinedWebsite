const images = document.querySelectorAll('.orbit-image');
const centerImage = document.querySelector('.center-image');

const imageData = [];

images.forEach((image, index) => {
    const startX = Math.random() * (window.innerWidth - 100);
    const startY = Math.random() * (window.innerHeight - 100);
    const speedX = (Math.random() * 2) - 1; // Reduzierte Geschwindigkeit für sanftere Bewegung
    const speedY = (Math.random() * 2) - 1; // Reduzierte Geschwindigkeit für sanftere Bewegung

    // Setze Startposition
    image.style.left = `${startX}px`;
    image.style.top = `${startY}px`;

    // Füge die Bilddaten zur Liste hinzu
    imageData.push({
        element: image,
        x: startX,
        y: startY,
        speedX: speedX,
        speedY: speedY,
        radius: 50, // Radius des Bildes (100px Durchmesser)
        isPaused: false // Status, ob das Bild angehalten wurde
    });

    image.addEventListener('mouseenter', () => {
        imageData[index].isPaused = true;
        image.classList.add('burst'); // Füge Burst-Animation hinzu
        setTimeout(() => {
            image.classList.remove('burst'); // Entferne Rebuild-Animation nach dem Ende
            image.querySelector('img').style.opacity = 1; // Stelle sicher, dass das Bild sichtbar bleibt
        }, 600); 
        image.querySelector('img').style.opacity = 1; // Stelle sicher, dass das Bild sichtbar ist
    });

    // Event Listener zum Fortsetzen der Bewegung bei Mausverlassen
    image.addEventListener('mouseleave', () => {
        imageData[index].isPaused = false;
        image.classList.add('rebuild'); // Füge Rebuild-Animation hinzu
        setTimeout(() => {
            image.classList.remove('rebuild'); // Entferne Rebuild-Animation nach dem Ende
            image.querySelector('img').style.opacity = 1; // Stelle sicher, dass das Bild sichtbar bleibt
        }, 600); // Warte, bis die Rebuild-Animation beendet ist
    });
});

// Zentrales Bild (Lorenz)
const centerRadius = 75; // Lorenz-Bild hat 150px Durchmesser
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// Kollisionsprüfung zwischen zwei Kreisen (Bild und Lorenz bzw. andere Bilder)
function checkCollision(x1, y1, r1, x2, y2, r2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < r1 + r2;
}

// Funktion zur Behandlung von Kollisionen (elastisches Abstoßen)
function handleCollision(data1, data2) {
    const dx = data2.x + data2.radius - (data1.x + data1.radius);
    const dy = data2.y + data2.radius - (data1.y + data1.radius);
    const angle = Math.atan2(dy, dx);

    // Berechne die elastische Kraft (reduzierte Geschwindigkeit)
    const speed1 = Math.sqrt(data1.speedX * data1.speedX + data1.speedY * data1.speedY) * 0.9;
    const speed2 = Math.sqrt(data2.speedX * data2.speedX + data2.speedY * data2.speedY) * 0.9;

    // Update die Geschwindigkeiten nach der elastischen Kollision
    data1.speedX = -Math.cos(angle) * speed1;
    data1.speedY = -Math.sin(angle) * speed1;
    data2.speedX = Math.cos(angle) * speed2;
    data2.speedY = Math.sin(angle) * speed2;

    // Sanfter visueller Effekt bei Kollision (kurzes Vergrößern/Verkleinern der Bubbles)
    data1.element.style.transform = "scale(1.1)";
    data2.element.style.transform = "scale(1.1)";
    setTimeout(() => {
        data1.element.style.transform = "scale(1)";
        data2.element.style.transform = "scale(1)";
    }, 200);
}

// Hauptbewegungsfunktion
function moveImages() {
    imageData.forEach((data, index) => {
        // Bewege das Bild nur, wenn es nicht angehalten ist
        if (!data.isPaused) {
            data.x += data.speedX;
            data.y += data.speedY;
        }

        // Bildschirmrand-Kollision (elastisches Abprallen)
        if (data.x <= 0 || data.x + data.radius * 2 >= window.innerWidth) {
            data.speedX *= -1;
            data.element.style.transform = "scale(1.1)";
            setTimeout(() => data.element.style.transform = "scale(1)", 200);
        }
        if (data.y <= 0 || data.y + data.radius * 2 >= window.innerHeight) {
            data.speedY *= -1;
            data.element.style.transform = "scale(1.1)";
            setTimeout(() => data.element.style.transform = "scale(1)", 200);
        }

        // Kollision mit dem Lorenz-Bild (elastisches Abprallen)
        if (checkCollision(data.x + data.radius, data.y + data.radius, data.radius, centerX, centerY, centerRadius)) {
            const collisionAngle = Math.atan2(data.y + data.radius - centerY, data.x + data.radius - centerX);
            data.speedX = Math.cos(collisionAngle) * 3;
            data.speedY = Math.sin(collisionAngle) * 3;
            data.element.style.transform = "scale(1.1)";
            setTimeout(() => data.element.style.transform = "scale(1)", 200);
        }

        // Kollision mit anderen umlaufenden Bildern
        for (let i = index + 1; i < imageData.length; i++) {
            const otherData = imageData[i];
            if (checkCollision(data.x + data.radius, data.y + data.radius, data.radius, otherData.x + otherData.radius, otherData.y + otherData.radius, otherData.radius)) {
                handleCollision(data, otherData);
            }
        }

        // Aktualisiere die Position des Bildes im DOM
        data.element.style.left = `${data.x}px`;
        data.element.style.top = `${data.y}px`;
    });

    // Wiederhole die Bewegung
    requestAnimationFrame(moveImages);
}

// Starte die Animation
moveImages();