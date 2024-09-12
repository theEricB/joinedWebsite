// Datei: countdown.js

let targetDate = null;

(async () => {
    try {
        console.log("DAVOR")
        const response = await fetch('http://212.227.245.238/api/angi');
        
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen des Ziel-Datums');
        }
        
        // JSON-Daten extrahieren
        const targetDateData = await response.json();
        
        // targetDateString auf den Wert aus dem JSON setzen
        const targetDateString = targetDateData.date; // Annahme: das JSON enthält ein `date`-Feld

        console.log('Ziel-Datum:', targetDateString);
        
        // Beispiel: ein Element in der UI anzeigen
        document.querySelector('#target-date').textContent = targetDateString;
        
        // Setze das Ziel-Datum
        targetDate = new Date(targetDateString).getTime();

    } catch (error) {
        console.log("Fehler beim Laden der Daten:", error.message);
    }
})();




console.log("Script geladen, Zielzeit: ", targetDate);

const countdownElement = document.getElementById('countdown');
const textElemenent = document.getElementById('sorry');
const countdownImage = document.getElementById('countdown-image');

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;


    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (timeLeft < 0) {
        countdownElement.innerHTML = "Klopf Klopf!";
        countdownElement.style.top = "40%";
        textElemenent.innerHTML = "";
        countdownImage.src = `images/11.jpg?cb=3.5`;
        countdownImage.style.display = 'block';
        return;
    } else if (days < 1 && hours < 1 && minutes < 1) {
        countdownElement.innerHTML = `${seconds}s`;
    } else if (days < 1 && hours < 1) {
        countdownElement.innerHTML = `${minutes}m ${seconds}s`;
    } else if (days < 1) {
        countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
    } else {
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const timeToNextPicLabel = document.getElementById('timeToNextPic');
    timeToNextPicLabel.innerHTML = `Time until next Picture:<br>
     ${Math.floor((hours / 3,4))}h ${minutes}m ${seconds}s`;

    

    // Update image based on the remaining days
    updateImage(days, hours);
}

function updateImage(days, hours) {
     // Unique timestamp to prevent caching
    const imagePath = `images/${days * 10 + Math.floor((hours / 3,4) + 1)}.jpg?cb=1.4`;
    countdownImage.src = imagePath;
    countdownImage.style.display = 'block';
}

// Update every second
setInterval(updateCountdown, 1000);

// Initial call to display the countdown immediately
updateCountdown();

function add10Min() {
    targetDate = targetDate + (10 * 60 * 1000);
}
