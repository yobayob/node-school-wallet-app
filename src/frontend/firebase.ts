import './firebase/firebase.js'
import './firebase/firebase-messaging.js'

// it's hackaton, time is 00:31 and I have no will to use chrome.d.ts
declare const Notification: any;
declare const messaging: any;
declare const localStorage: any;
declare const firebase: any;

console.log(firebase);
const app = firebase.initializeApp({messagingSenderId: '47529967159'});

const sendTokenToServer = (token: string) =>
	fetch(`/token/update?token=${token}`, {method: 'get', credentials: 'include'}).catch(console.log);


const setTokenSentToServer = (currentToken: string) =>
	localStorage.setItem('sentFirebaseMessagingToken', currentToken);

const subscribe = () => {
	const messaging = firebase.messaging();
	messaging.requestPermission()
		.then(() => {
			messaging.getToken()
				.then((currentToken: string) => {
					console.log(currentToken);
					if (currentToken) {
						sendTokenToServer(currentToken).catch(console.log);
					} else {
						console.warn('Не удалось получить токен.');
						setTokenSentToServer('');
					}
				})
				.catch((err: Error) => {
					console.warn('При получении токена произошла ошибка.', err);
					setTokenSentToServer('');
				});
		})
		.catch((err: Error) => {
			console.warn('Не удалось получить разрешение на показ уведомлений.', err);
		});
};

console.log('here');

if (Notification.permission === 'granted') {
	subscribe();
}
subscribe();
if ('Notification' in window) {
	const messaging = firebase.messaging();

	messaging.onMessage((payload: any) => {
		console.log('Message received. ', payload);
		new Notification(payload.notification.title, payload.notification);
	});
}
