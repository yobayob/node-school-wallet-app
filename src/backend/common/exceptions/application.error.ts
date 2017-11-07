
export class ApplicationError extends Error {
	constructor(public code: string, public status: number = 500) {
		super('');
		this.code = code;
	}
}
