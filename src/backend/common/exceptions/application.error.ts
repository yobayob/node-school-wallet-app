export class ApplicationError extends Error {
	constructor(public message: string, public status: number = 500) {
		super(message)
	}
}
