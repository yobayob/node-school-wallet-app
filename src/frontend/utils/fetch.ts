import axios, {AxiosResponse } from 'axios';

const responseBody = (res: AxiosResponse) => res.data;

const http = {
	get: (url: string, config={}) => axios.get(url, config).then(responseBody),
	post: (url: string, data: any, config={}) => axios.post(url, data, config).then(responseBody),
	put: (url: string, data: any, config={}) => axios.put(url, data, config).then(responseBody),
	del: (url: string, config={}) => axios.get(url, config).then(responseBody),
};

export default http;

