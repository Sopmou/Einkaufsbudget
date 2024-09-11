// budgetSop-Variable
let budgetSopSop = 100;
let lastMonth = null; // Hier speichern wir den Monat, wann das budgetSopSop zuletzt zurückgesetzt wurde

// Funktion zum Abrufen des budgetSopSops und des letzten Monats aus Local Storage
function fetchbudgetSop() {
    const savedbudgetSop = localStorage.getItem('budgetSop');
    const savedLastMonth = localStorage.getItem('lastMonth');

    // Wenn budgetSop und letzter Monat im Local Storage vorhanden sind, laden wir diese
    if (savedbudgetSop !== null && savedLastMonth !== null) {
        budgetSop = parseFloat(savedbudgetSop);
        lastMonth = parseInt(savedLastMonth);
    }

    document.getElementById("einkaufsbudgetSop").innerText = budgetSop + "€";

    // Monat überprüfen und ggf. budgetSop zurücksetzen
    checkAndResetbudgetSop();
}

// Funktion zum Aktualisieren des budgetSops und des Monats im Local Storage
function updatebudgetSopInLocalStorage() {
    const currentMonth = new Date().getMonth(); // Aktueller Monat

    // budgetSop und aktuellen Monat im Local Storage speichern
    localStorage.setItem('budgetSop', budgetSop);
    localStorage.setItem('lastMonth', currentMonth);

    console.log('budgetSop erfolgreich in Local Storage aktualisiert');
}

// Funktion zum Zurücksetzen des budgetSops am Monatsanfang
function checkAndResetbudgetSop() {
    const currentMonth = new Date().getMonth(); // Aktueller Monat

    // Wenn der Monat sich geändert hat, setze das budgetSop zurück
    if (lastMonth === null || currentMonth !== lastMonth) {
        budgetSop = 100; // budgetSop zurücksetzen
        document.getElementById("einkaufsbudgetSop").innerText = budgetSop + "€";
        updatebudgetSopInLocalStorage(); // Local Storage mit dem neuen budgetSop und Monat aktualisieren
    }
}

// Event Listener für den Submit-Button
document.getElementById("submitButton").addEventListener("click", function() {
    let price = parseFloat(document.getElementById("preisInput").value);
    if (!isNaN(price) && price > 0) {
        budgetSop -= price;
        document.getElementById("einkaufsbudgetSop").innerText = budgetSop + "€";
        updatebudgetSopInLocalStorage();  // budgetSop in Local Storage aktualisieren
    }
});

// Beim Laden der Seite das budgetSop und den letzten Monat aus Local Storage laden
fetchbudgetSop();
