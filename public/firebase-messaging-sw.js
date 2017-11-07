importScripts('https://www.gstatic.com/firebasejs/4.6.0/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.0/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '47529967159'
});

firebase.messaging();
