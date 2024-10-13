
// Funktion, um Rezepte vom Backend-Server zu holen
export async function fetchRecipes() {
    try {
        const response = await fetch('http://www.cowfoot.xyz/api/recipes');
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