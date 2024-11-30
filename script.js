// Firebase configuration (replace with your Firebase credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Registration Function
function registerVoter(name, course, passport) {
    db.ref('voters/' + passport).once('value', (snapshot) => {
        if (snapshot.exists()) {
            alert("Passport number already registered.");
        } else {
            db.ref('voters/' + passport).set({
                name: name,
                course: course,
                passport: passport,
                voted: false
            });
            alert("Registration successful.");
        }
    });
}

// Voting Function
function vote(passport, president, generalSecretary) {
    db.ref('voters/' + passport).once('value', (snapshot) => {
        if (!snapshot.exists()) {
            alert("You are not eligible to vote.");
            return;
        }
        const voter = snapshot.val();
        if (voter.voted) {
            alert("You can't vote twice.");
            return;
        }
        db.ref('votes/' + passport).set({
            president: president,
            generalSecretary: generalSecretary
        });
        db.ref('voters/' + passport).update({ voted: true });
        alert("Vote submitted successfully.");
    });
}

// Commissioners' Panel
function viewResults(passcode) {
    const commissioners = {
        "comm1": "passcode1",
        "comm2": "passcode2",
        "comm3": "passcode3",
        "comm4": "passcode4",
        "comm5": "passcode5"
    };
    if (!commissioners[passcode]) {
        alert("Invalid passcode.");
        return;
    }
    db.ref('votes').once('value', (snapshot) => {
        const votes = snapshot.val();
        // Process and display results
        console.log(votes);
    });
}
