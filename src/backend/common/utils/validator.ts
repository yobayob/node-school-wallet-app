import {validate, Schema} from 'jsonschema'
import {ApplicationError} from '../exceptions'

export async function Validate(o: any, schema: Schema) {
	const v = validate(o, schema);
	if (!v.valid) {
		throw new ApplicationError(v.errors.toString(), 400)
	}
}
