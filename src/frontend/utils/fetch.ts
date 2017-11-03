import axios, {AxiosResponse } from 'axios';

const responseBody = (res: AxiosResponse) => res.data;
const config = {};

const http = {
	get: (url: string) => axios.get(url, config).then(responseBody),
	post: (url: string, data: any) => axios.post(url, data, config).then(responseBody),
	put: (url: string, data: any) => axios.put(url, data, config).then(responseBody),
	del: (url: string) => axios.get(url, config).then(responseBody),
};

export default http;
