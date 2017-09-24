const jsonSchema = require('commonjs-utils/lib/json-schema');

//middleware for validate json data in request body
//return errors as json -- {"field1: ["err1", "err2", ...], "field2": [...], "non_field_errors": [...]}
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
