
// Funktion, um Rezepte vom Backend-Server zu holen
export async function fetchRecipes() {
    try {
        const response = await fetch('http://212.227.245.238/api/recipes');
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Rezepte:', error);
        throw error;
    }
}