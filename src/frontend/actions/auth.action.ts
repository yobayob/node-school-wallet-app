const openPopup = async (provider: string) => {
	return new Promise((resolve, reject) => {
		window.open(provider, 'oauth', 'width=650,height=550');
		window.addEventListener('message', (e: any) => {
			// TODO: check origin
			resolve(e.data)
		}, false);
	});
};

export const login = (provider: string) => {
	return async (dipatch: any) => {
		const userInfo = await openPopup(`/sign-in/${provider}`);
		console.log(userInfo);
	}
};
