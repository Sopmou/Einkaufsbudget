// Budget-Variable
let budget = 300;
let lastMonth = null; // Hier speichern wir den Monat, wann das Budget zuletzt zurückgesetzt wurde

// Funktion zum Abrufen des Budgets und des letzten Monats aus Local Storage
function fetchBudget() {
    const savedBudget = localStorage.getItem('budget');
    const savedLastMonth = localStorage.getItem('lastMonth');

    // Wenn Budget und letzter Monat im Local Storage vorhanden sind, laden wir diese
    if (savedBudget !== null && savedLastMonth !== null) {
        budget = parseFloat(savedBudget);
        lastMonth = parseInt(savedLastMonth);
    }

    document.getElementById("einkaufsBudget").innerText = budget + "€";

    // Monat überprüfen und ggf. Budget zurücksetzen
    checkAndResetBudget();
}

// Funktion zum Aktualisieren des Budgets und des Monats im Local Storage
function updateBudgetInLocalStorage() {
    const currentMonth = new Date().getMonth(); // Aktueller Monat

    // Budget und aktuellen Monat im Local Storage speichern
    localStorage.setItem('budget', budget);
    localStorage.setItem('lastMonth', currentMonth);

    console.log('Budget erfolgreich in Local Storage aktualisiert');
}

// Funktion zum Zurücksetzen des Budgets am Monatsanfang
function checkAndResetBudget() {
    const currentMonth = new Date().getMonth(); // Aktueller Monat

    // Wenn der Monat sich geändert hat, setze das Budget zurück
    if (lastMonth === null || currentMonth !== lastMonth) {
        budget = 300; // Budget zurücksetzen
        document.getElementById("einkaufsBudget").innerText = budget + "€";
        updateBudgetInLocalStorage(); // Local Storage mit dem neuen Budget und Monat aktualisieren
    }
}

// Event Listener für den Submit-Button
document.getElementById("submitButton").addEventListener("click", function() {
    let price = parseFloat(document.getElementById("preisInput").value);
    if (!isNaN(price) && price > 0) {
        budget -= price;
        document.getElementById("einkaufsBudget").innerText = budget + "€";
        updateBudgetInLocalStorage();  // Budget in Local Storage aktualisieren
    }
});

// Beim Laden der Seite das Budget und den letzten Monat aus Local Storage laden
fetchBudget();
