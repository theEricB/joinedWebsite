
// Funktion, um Rezepte vom Backend-Server zu holen
async function fetchPlayers() {
    try {
        const response = await fetch('/api/amongUs');
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
        let players = await fetchPlayers(); 
        console.log(players) // Auf den Rückgabewert der fetchPlayers-Funktion warten
        players.forEach(player => {
            addPlayer(player.name);  // Nehmen wir an, dass jeder Spieler ein `name`-Feld hat
        });
    } catch (error) {
        console.error('Fehler beim Laden der Spieler:', error);
    }
}

loadPlayers();
