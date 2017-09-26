import {validate, Schema} from 'jsonschema'

export function Validate(o:any, schema:Schema) {
	return new Promise((resolve, reject)=>{
		try {
			const v = validate(o, schema);
			if (!v.valid){
				reject(v.errors);
				return
			}
			resolve()
		} catch (err){
			reject(err)
		}
	})
}
