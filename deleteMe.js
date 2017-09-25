const fs = require('fs');
const request = require('request');


async function req(url) {
	return new Promise((resolve, reject) => {
		request(url, (err, response) => {
			if (err) {
				// Обработка ошибок
				reject(err)
			}
			resolve(response.statusCode);
		});
	})
}

async function readJson(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, config) => {
			if (err) {
				// Обработка ошибок
				reject(err)
			}
			let configJSON;
			try {
				configJSON = JSON.parse(config);
			} catch (err) {
				// Обработка ошибоk
				reject(err)
			}
			resolve(configJSON)
		})
	})
}

// readJson('config.json')
// 	.then(
// 	config => req(config.url),
// 	).then(
// 	code => console.log(code),
// ).catch(
// 	error => console.log(error)
// );
//
// let values = [1,2,3,4,5,6, 'ljhpi'];
// const displayValue = (value) => {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			console.log('value is', value);
// 			resolve();
// 		}, 1000)
// 	});
// };
//
// function iteratorOfPromisesForEach() {
//   let p = Promise.resolve();
//   for (let v of values) {
//     p = p.then(() => displayValue(v))
//   }
//   return p
// }
//
// iteratorOfPromisesForEach(values);

const co = require('co');

function *gen() {
	let a = yield readJson('config.json');
	let b = yield req(a.url);
	return b
}
//
//
//
// co(gen()).then(value => console.log(value),
// 		err => console.log(err)
// );


(async() => {
	try {
		const a = await readJson('config.json');
		const b = await req(a.url)
	console.log(b)
	} catch (e) {
		console.log(e)
	}
})();
