import { CustomError } from "./custom-error";

class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';
    constructor() {
        super('unable to communicate with db');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}

export { DatabaseConnectionError};