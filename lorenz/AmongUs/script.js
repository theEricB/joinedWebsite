
// Funktion, um Rezepte vom Backend-Server zu holen
async function fetchPlayers() {
    try {
        const response = await fetch('http://212.227.245.238/api/amongUs/');
        if (!response.ok) {
            console.error(response)
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json();
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
    const response = await fetch('/api/amongUs/' + playerName, {
        method: 'PUT', // PUT Methode verwenden
        headers: {
            'Content-Type': 'application/json', // Daten als JSON senden
        },
    })
    console.log(response)
}

function joinGroup() {
    const gameTagTextBox = document.getElementById("gameTag")
    if (gameTagTextBox.value != "") {
        addPlayerToJson(gameTagTextBox.value)
        addPlayer(gameTagTextBox.value)
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const joinGroupBtn = document.getElementById("joinGroupBtn");
    
    joinGroupBtn.addEventListener("click", joinGroup);
});

loadPlayers();