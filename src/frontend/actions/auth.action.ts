import {decode} from 'jsonwebtoken';
import {push} from 'react-router-redux';
import * as actions from './types';
import {getCards} from './card.action';
import {fetch} from '../utils';

const setCookie = (name: string, value: any, options?: any) => {

	if (document) {
		options = options || {};
		let expires = options.expires;

		if (typeof expires === 'number' && expires) {
			const d = new Date();
			d.setTime(d.getTime() + expires * 1000);
			expires = options.expires = d;
		}
		if (expires && expires.toUTCString) {
			options.expires = expires.toUTCString();
		}

		value = encodeURIComponent(value);

		let updatedCookie = name + "=" + value;

		for (const propName in options) {
			updatedCookie += "; " + propName;
			const propValue: any = options[propName];
			if (propValue !== true) {
				updatedCookie += "=" + propValue;
			}
		}
		document.cookie = updatedCookie;
	}

};

const getCookie = (name: string) => {
	if (document) {
		const matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
};

// open popup and wait json
const openPopup = async (provider: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		window.open(provider, 'oauth', 'width=650,height=550');
		window.addEventListener('message', (e: any) => {
			// TODO: check origin
			resolve(e.data as any)
		}, false);
	});
};

const getToken = () => {
	return getCookie('jwt');
};

const getCurrentUser = () => {
	const user = localStorage.getItem(`currentUser`);
	if (user) {
		return JSON.parse(user);
	}
};

const prepareToken = (token: string, dispatch: any) => {
	const user = decode(token) as any;
	localStorage.setItem(`currentUser`, JSON.stringify(user));
	setCookie(`jwt`, token);
	if (user.status === 10) {
		dispatch(signUp());
	} else {
		dispatch({
			type: actions.AUTH_SIGNUP,
			payload: user,
		})
	}
};

export const login = (provider: string) => {
	return async (dispatch: any) => {
		const userInfo = await openPopup(`/sign-in/${provider}`);
		if (userInfo.success === true) {
			prepareToken(userInfo.token, dispatch);
		}
	}
};

export const signUp = () => {
	return async (dispatch: any) => {
		dispatch(push('/'));
		dispatch(getCards());
		dispatch({
			type: actions.AUTH_SUCCESS,
			payload: getCurrentUser(),
		})
	}
};

// Set token auth
export const fetchConfig = () => ({
	headers: {
		Authorization: `JWT ${getToken()}`,
	},
});

export const updateUserInfo = (first_name: string, last_name: string, phone: string) => {
	return async (dispatch: any) => {
		try {
			const response = await fetch.post(`/sign-up`, {first_name, last_name, phone}, fetchConfig());
			console.log(response);
			if (response.success) {
				prepareToken(response.token, dispatch)
			}
		} catch (err) {
			console.log(err)
		}
	}
};

export const signOut = () => {
	return (dispatch: any) => {
		localStorage.removeItem(`currentUser`);
		setCookie('jwt', '');
		dispatch(push('/login'))
	}
};

export const checkAuth = () => {
	return (dispatch: any) => {
		const user = getCurrentUser();
		if (!user) {
			console.log(`user not found`)
			dispatch(signOut());
			return
		}
		const token = getToken();
		if (!token || token === '') {
			console.log(`token not found`)
			dispatch(signOut());
			return
		}
		dispatch({
			type: actions.AUTH_SUCCESS,
			payload: user,
		})
	}
};
