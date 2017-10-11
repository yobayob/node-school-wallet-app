import axios from 'axios';

const responseBody = (res: any) => res.body;

const config = {};

const http = {
	get: (url: string) => axios.get(url, config).then(responseBody),
	post: (url: string, data: any) => axios.post(url, data, config).then(responseBody),
	put: (url: string, data: any) => axios.put(url, data, config).then(responseBody),
	del: (url: string) => axios.get(url, config).then(responseBody),
};

/* requests to cards api */
export class CardAction {

	static pay(cardId: number, data: {amount: number}) {
		return http.post(`/cards/${cardId}/pay`, data)
	}

	static fill(cardId: number, data: {amount: number}) {
		return http.post(`/cards/${cardId}/fill`, data)
	}

	static transfer(cardId: number, data: {amount: number, cardId: string}) {
		return http.post(`/cards/${cardId}/transfer`, data)
	}
}
