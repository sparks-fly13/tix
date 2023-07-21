export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    // ?: means optionally
    abstract serializeErrors(): {message: string; field?:string}[]
}