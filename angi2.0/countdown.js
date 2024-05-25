// Datei: countdown.js

// Zielzeit: 03.06.2024 um 20:30 Uhr
const targetDate = new Date("June 3, 2024 20:30:00").getTime();
console.log("Script geladen, Zielzeit: ", targetDate);

const countdownElement = document.getElementById('countdown');
const countdownImage = document.getElementById('countdown-image');

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
        countdownElement.innerHTML = "Zeit ist abgelaufen!";
        countdownImage.style.display = 'none';
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Update image based on the remaining days
    updateImage(days, seconds);
}

function updateImage(days, hours) {
    const cacheBuster = new Date().getTime();
     // Unique timestamp to prevent caching
     if (Math.floor(hours / 12) > 1){
        hours = 23
     }
    const imagePath = `images/${days * 10 + Math.floor((hours / 12) + 1)}.jpg?cb=${cacheBuster}`; // Assumes images are named like "9.jpg", "8.jpg", etc.
    console.log(imagePath)
    countdownImage.src = imagePath;
    countdownImage.style.display = 'block';
}

// Update every second
setInterval(updateCountdown, 1000);

// Initial call to display the countdown immediately
updateCountdown();
