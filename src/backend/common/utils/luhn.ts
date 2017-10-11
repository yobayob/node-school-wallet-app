export function checkLuhn(val: string): boolean {
		if (/[^0-9-\s]+/.test(val)) return false;

		let nCheck = 0,
			bEven = false;

		for (let n = val.length - 1; n >= 0; n--) {

			let cDigit = val.charAt(n),
				nDigit = parseInt(cDigit, 10);

			if (bEven) {
				if ((nDigit *= 2) > 9) nDigit -= 9;
			}
			nCheck += nDigit;
			bEven = !bEven;
		}
		return (nCheck % 10) === 0;
}
