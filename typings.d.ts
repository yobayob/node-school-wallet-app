declare module '*.json' {
	const value: any;
	export default value;
}

declare module 'json!*' {
	const value: any;
	export default value;
}

declare module 'card-info' {
	export class CardInfo {
		balance: number;
		bankName: string;
		backgroundColor: string;
		textColor: string;
		bankLogoSvg: string;
		brandLogoSvg: string;
		bankAlias: string;
		numberNice: number;
		constructor(number: string, o: any)
	}
}
