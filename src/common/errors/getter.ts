const Dictionary = require('./dictionary.json');

export function getErrorByKey(key: string) {
	const properties: string[] = key.split('.');
	let tempObj: any = Dictionary;
	for (const property of properties) {
		if (typeof tempObj[property] !== 'undefined') {
			tempObj = tempObj[property];
		}
	}
	// plz don't kill me
	return typeof tempObj === 'string' ? tempObj : 'Неизвестная природе ошибка';
}
