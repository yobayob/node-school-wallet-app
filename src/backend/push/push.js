const FCM = require('fcm-push');

const API_KEY = 'AAAACxEBvjc:APA91bFQjJXWkjowLIu_ahZMQ7BLzK8e-Sv1f_ealFxWo-k9cSwYwmY0gPopphG1EYAqm1_voeq56UL-BhyWGNrMLyvwmn8vmpgDRY24NRyybRaTDAZotSPIH6QKLJ7G8y_nOKXZSw34';

class Push {


	constructor(key) {
		console.log(FCM);
		this.fcm = new FCM(key);
	}

	send(key, data) {
		this.fcm.send({to: key, notification: data}).catch(console.log);
	}

}

export const PushManager = new Push(API_KEY);
