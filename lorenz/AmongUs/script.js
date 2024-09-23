
// Funktion, um Rezepte vom Backend-Server zu holen
async function fetchPlayers() {
    try {
        const response = await fetch('/api/amongUs/');
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Rezepte:', error);
        throw error;
    }
}

function addPlayer(playerName) {
    console.log('addPlayer aufgerufen:', playerName);
    // Hole das 'ul'-Element, das die Liste der Spieler darstellt
    var playersList = document.getElementById('players');
    
    // Erstelle ein neues 'li'-Element für den Spieler
    var newPlayer = document.createElement('li');
    
    // Setze den Textinhalt des 'li'-Elements auf den Spielernamen
    newPlayer.textContent = playerName;
    
    // Füge das 'li'-Element zur Liste hinzu
    playersList.appendChild(newPlayer);
}

async function loadPlayers() {
    try {
        let players = await fetchPlayers();  // Auf den Rückgabewert der fetchPlayers-Funktion warten
        players.forEach(player => {
            addPlayer(player.playerName);  // Nehmen wir an, dass jeder Spieler ein `name`-Feld hat
        });
    } catch (error) {
        console.error('Fehler beim Laden der Spieler:', error);
    }
}

async function addPlayerToJson(playerName) {
    console.log("addPlayeerToJson")
    await fetch('/api/amongUs/' + playerName, {
        method: 'PUT', // PUT Methode verwenden
        headers: {
            'Content-Type': 'application/json', // Daten als JSON senden
            'Authorization': 'Bearer dein-token', // Optional: Authentifizierungstoken, falls nötig
        },
    })
}

function joinGroup() {
    const gameTagTextBox = document.getElementById("gameTag")
    if (gameTagTextBox.value != "") {
        console.log("Test hier")
        addPlayer(gameTagTextBox.value)
        console.log("Test hie2")
        addPlayerToJson(gameTagTextBox.value)
    }
}


document.addEventListener("DOMContentLoaded", function() {
    console.log("Hi")
    const joinGroupBtn = document.getElementById("joinGroupBtn");
    
    joinGroupBtn.addEventListener("click", joinGroup);
});

loadPlayers();