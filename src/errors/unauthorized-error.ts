import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('unauthorized');
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    serializeErrors() {
        return [
            {message: 'Unauthorized'}
        ]
    }
}