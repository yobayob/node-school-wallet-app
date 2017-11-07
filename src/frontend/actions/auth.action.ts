import {decode} from 'jsonwebtoken';
import {push} from 'react-router-redux';
import * as actions from './types';
import {getCards} from './card.action';
import {fetch} from '../utils';

// basic wrapper on set cookie. its crazy sh...
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

		let updatedCookie = name + '=' + value;

		for (const propName in options) {
			updatedCookie += '; ' + propName;
			const propValue: any = options[propName];
			if (propValue !== true) {
				updatedCookie += '=' + propValue;
			}
		}
		document.cookie = updatedCookie;
	}

};

// basic wrapper on cookie
const getCookie = (name: string) => {
	if (document) {
		const matches = document.cookie.match(new RegExp(
			'(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
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

// get token from cookie storage
const getToken = () => {
	return getCookie('jwt');
};

// get user from local storage
const getCurrentUser = () => {
	const user = localStorage.getItem(`currentUser`);
	if (user) {
		return JSON.parse(user);
	}
};

// process login -> save token to cookie storage && save user to localstorage
const processToken = (token: string, dispatch: any) => {
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

// send request and recieve token
export const login = (provider: string) => {
	return async (dispatch: any) => {
		const userInfo = await openPopup(`/sign-in/${provider}`);
		if (userInfo.success === true) {
			processToken(userInfo.token, dispatch);
		}
	}
};

// if registration incompelete send other data
export const updateUserInfo = (first_name: string, last_name: string, phone: string) => {
	return async (dispatch: any) => {
		try {
			const response = await fetch.post(`/sign-up`, {first_name, last_name, phone});
			if (response.success) {
				processToken(response.token, dispatch)
			}
		} catch (err) {
			console.log(err)
		}
	}
};

// it's okay. redirect to main page
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

// logout
export const signOut = () => {
	return (dispatch: any) => {
		localStorage.removeItem(`currentUser`);
		setCookie('jwt', '');
		dispatch(push('/login'))
	}
};

// check all permission && redirect on login or setState
export const checkAuth = () => {
	return (dispatch: any) => {
		const user = getCurrentUser();
		if (!user) {
			dispatch(signOut());
			return
		}
		const token = getToken();
		if (!token || token === '') {
			dispatch(signOut());
			return
		}
		dispatch({
			type: actions.AUTH_SUCCESS,
			payload: user,
		})
	}
};
