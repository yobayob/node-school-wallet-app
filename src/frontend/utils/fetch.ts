import axios, {AxiosResponse } from 'axios';

const responseBody = (res: AxiosResponse) => {
	if (res.status < 200 || res.status > 399) {
		console.log(res.data);
		throw new Error(`Failed request`)
	}
	return res.data
}

const http = {
	get: (url: string, config={}) => axios.get(url, config).then(responseBody),
	post: (url: string, data: any, config={}) => axios.post(url, data, config).then(responseBody),
	put: (url: string, data: any, config={}) => axios.put(url, data, config).then(responseBody),
	del: (url: string, config={}) => axios.get(url, config).then(responseBody),
};

export default http;

