import { CustomError } from "./custom-error";

export class RoutingError extends CustomError {
    statusCode = 404

    constructor() {
        super('Route not found');

        Object.setPrototypeOf(this, RoutingError.prototype);
    }

    serializeErrors() {
        return [{message: 'Not found'}]
    }
}