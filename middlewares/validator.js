const jsonSchema = require('commonjs-utils/lib/json-schema');

//middleware for check request data with schema
module.exports = (schema) => {
	return (req, res, next) => {
		let v = jsonSchema.validate(req.body, schema);
		if (!v.valid){
			let errors = {};
			// serialize error with schema validation
			v.errors.forEach( item => (errors[item.property] !== undefined)
				? errors[item.property].push(item.message)
				: errors[item.property]=[item.message, ]);

			// fuuu
			if (errors['']!== undefined){
				errors.non_field_errors = errors[''];
				delete errors[''];
			}
			res.status(400).json(errors);
			return
			}
		next()
	}
};
