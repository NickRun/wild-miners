"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
var firebaseConfig = {
    apiKey: "AIzaSyArz25oGdn8tkAdOlVZ5KCi1wOAQf7wrjg",
    authDomain: "wild-miners.firebaseapp.com",
    databaseURL: "https://wild-miners.firebaseio.com",
    projectId: "wild-miners",
    storageBucket: "wild-miners.appspot.com",
    messagingSenderId: "1030635585878"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().signInAnonymously().catch(function (error) {
    console.log('error');
});
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('logged in');
        setData();
    }
    else {
        console.log('logged out');
    }
});
function setData() {
    firebase.database().ref('games/asdf').set({
        gameData: 'hello'
    });
}
