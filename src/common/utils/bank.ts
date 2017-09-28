export const VISA = 'visa';
export const MAESTRO = 'maestro';
export const MASTERCARD = 'mastercard';
export const MIR = 'mir';


export function getCardType(val: string): string {
	const mirBin = /^220[0-4]\s?\d\d/;
	const firstNum = val[0];

	switch (firstNum) {
		case '2': {
			if (mirBin.test(val)) {
				return MIR;
			} else {
				return '';
			}
		}
		case '4': {
			return VISA;
		}
		case '5': {
			const secondNum = val[1] || '';

			if (secondNum === '0' || secondNum > '5') {
				return MAESTRO;
			} else {
				return MASTERCARD;
			}
		}
		case '6': {
			return MAESTRO;
		}
		default: {
			return '';
		}
	}
}

export function formatCardNumber (cardNumber: string, delimeter: string ): string {
		const formattedCardNumber = [];
		delimeter = delimeter || '\u00A0';
		if (cardNumber) {
			while (cardNumber && typeof cardNumber === 'string') {
				formattedCardNumber.push(cardNumber.substr(0, 4));
				cardNumber = cardNumber.substr(4);
				if (cardNumber) {
					formattedCardNumber.push(delimeter);
				}
			}
		}
		return formattedCardNumber.join('');
}
