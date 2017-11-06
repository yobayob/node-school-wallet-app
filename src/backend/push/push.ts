import * as FCM from 'fcm-push'

const API_KEY = 'AAAACxEBvjc:APA91bFQjJXWkjowLIu_ahZMQ7BLzK8e-Sv1f_ealFxWo-k9cSwYwmY0gPopphG1EYAqm1_voeq56UL-BhyWGNrMLyvwmn8vmpgDRY24NRyybRaTDAZotSPIH6QKLJ7G8y_nOKXZSw34';

interface IPush {
	fcm: any;
}

class Push implements IPush {

	public fcm: any;

	constructor(key: string) {
		this.fcm = new FCM(key);
	}

	send(key: string, data: { title: string, body: string }) {
		this.fcm.send({to: key, notification: data}).catch(console.log);
	}

}

export const PushManager = new Push(API_KEY);
