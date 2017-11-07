// declare module 'fcm-push' {
// 	class FCM {
// 		constructor(o: any);
//
// 		send(o: any): any;
// 	}
//
// }

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

declare module '*.json' {
	const value: any;
	export default value;
}

declare module 'mongoose' {
	export interface SequenceOptions {
		inc_field: string;
		id?: string;
		reference_fields?: Array<string>;
		disable_hooks?: boolean;
		collection_name?: string;
	}

	export interface SequenceDocument extends Document {
		setNext(sequenceId: string, callback: (err: any, res: SequenceDocument) => void): void;
	}

	export interface SequenceSchema extends Schema {
		plugin(plugin: (schema: SequenceSchema, options: SequenceOptions) => void,
			   options: SequenceOptions): this;

		// overload for the default mongoose plugin function
		plugin(plugin: (schema: Schema, options?: Object) => void, opts?: Object): this;
	}
}

declare module 'mongoose-sequence' {
	import mongoose = require('mongoose');

	var _: (goose: Object) => (schema: mongoose.Schema, options?: Object) => void;
	export = _;
}


declare module '*.css' {
	const content: any;
	export default content;
}

declare var __ENV__: string;
