// budgetAshs-Variable
let budgetAshs = 200;
let lastMonth = null; // Hier speichern wir den Monat, wann das budgetAshs zuletzt zurückgesetzt wurde

// Funktion zum Abrufen des budgetAshss und des letzten Monats aus Local Storage
function fetchbudgetAshs() {
    const savedbudgetAshs = localStorage.getItem('budgetAshs');
    const savedLastMonth = localStorage.getItem('lastMonth');

    // Wenn budgetAshs und letzter Monat im Local Storage vorhanden sind, laden wir diese
    if (savedbudgetAshs !== null && savedLastMonth !== null) {
        budgetAshs = parseFloat(savedbudgetAshs);
        lastMonth = parseInt(savedLastMonth);
    }

    document.getElementById("einkaufsbudgetAshs").innerText = budgetAshs + "€";

    // Monat überprüfen und ggf. budgetAshs zurücksetzen
    checkAndResetbudgetAshs();
}

// Funktion zum Aktualisieren des budgetAshss und des Monats im Local Storage
function updatebudgetAshsInLocalStorage() {
    const currentMonth = new Date().getMonth(); // Aktueller Monat

    // budgetAshs und aktuellen Monat im Local Storage speichern
    localStorage.setItem('budgetAshs', budgetAshs);
    localStorage.setItem('lastMonth', currentMonth);

    console.log('budgetAshs erfolgreich in Local Storage aktualisiert');
}

// Funktion zum Zurücksetzen des budgetAshss am Monatsanfang
function checkAndResetbudgetAshs() {
    const currentMonth = new Date().getMonth(); // Aktueller Monat

    // Wenn der Monat sich geändert hat, setze das budgetAshs zurück
    if (lastMonth === null || currentMonth !== lastMonth) {
        budgetAshs = 200; // budgetAshs zurücksetzen
        document.getElementById("einkaufsbudgetAshs").innerText = budgetAshs + "€";
        updatebudgetAshsInLocalStorage(); // Local Storage mit dem neuen budgetAshs und Monat aktualisieren
    }
}

// Event Listener für den Submit-Button
document.getElementById("submitButton").addEventListener("click", function() {
    let price = parseFloat(document.getElementById("preisInput").value);
    if (!isNaN(price) && price > 0) {
        budgetAshs -= price;
        document.getElementById("einkaufsbudgetAshs").innerText = budgetAshs + "€";
        updatebudgetAshsInLocalStorage();  // budgetAshs in Local Storage aktualisieren
    }
});

// Beim Laden der Seite das budgetAshs und den letzten Monat aus Local Storage laden
fetchbudgetAshs();
