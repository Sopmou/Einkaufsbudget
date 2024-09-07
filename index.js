// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyBX6y74Z1-a3ae7H88NbnpwzhPn6lbq4Qs",
    authDomain: "einkaufsbudget.firebaseapp.com",
    databaseURL: "https://einkaufsbudget-default-rtdb.firebaseio.com"
    projectId: "einkaufsbudget",
    storageBucket: "einkaufsbudget.appspot.com",
    messagingSenderId: "241437630660",
    appId: "1:241437630660:web:d38daa0b3b68aa72e9e991"
  };
// Firebase initialisieren
firebase.initializeApp(firebaseConfig);

// Referenz zur Realtime Database
const db = firebase.database();

// Budget-Variable
let budget = 300;
let lastMonth = null; // Hier speichern wir den Monat, wann das Budget zuletzt zurückgesetzt wurde

// Funktion zum Abrufen des Budgets und des letzten Monats aus Firebase
function fetchBudget() {
    db.ref('budget').once('value', snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            budget = data.budget;
            lastMonth = data.lastMonth;
            document.getElementById("einkaufsBudget").innerText = budget + "€";

            // Monat überprüfen und ggf. Budget zurücksetzen
            checkAndResetBudget();
        }
    });
}

// Funktion zum Aktualisieren des Budgets und des Monats in Firebase
function updateBudgetOnServer() {
    const currentMonth = new Date().getMonth(); // Aktueller Monat
    db.ref('budget').set({
        budget: budget,
        lastMonth: currentMonth
    })
    .then(() => console.log('Budget erfolgreich aktualisiert'))
    .catch(error => console.error('Fehler beim Aktualisieren des Budgets:', error));
}

// Funktion zum Zurücksetzen des Budgets am Monatsanfang
function checkAndResetBudget() {
    const currentMonth = new Date().getMonth(); // Aktueller Monat

    // Wenn der Monat sich geändert hat, setze das Budget zurück
    if (lastMonth === null || currentMonth !== lastMonth) {
        budget = 300; // Budget zurücksetzen
        document.getElementById("einkaufsBudget").innerText = budget + "€";
        updateBudgetOnServer(); // Aktualisiere Firebase mit dem neuen Budget und Monat
    }
}

// Event Listener für den Submit-Button
document.getElementById("submitButton").addEventListener("click", function() {
    let price = parseFloat(document.getElementById("preisInput").value);
    if (!isNaN(price) && price > 0) {
        budget -= price;
        if (budget < 0) budget = 0;  // Sicherstellen, dass das Budget nicht negativ wird
        document.getElementById("einkaufsBudget").innerText = budget + "€";
        updateBudgetOnServer();  // Budget in Firebase aktualisieren
    }
});

// Beim Laden der Seite das Budget und den letzten Monat aus Firebase laden
fetchBudget();
