export class ServerError extends Error {
    code: Number;
    message: string;
    constructor(code, message) {
        super();

        this.code = code || 500;
        this.message = message || 'Server Error';
    }
}

export class ValidationError extends Error {
    code: Number;
    message: string;
    constructor(code, message) {
        super();

        this.code = code || 500;
        this.message = message || 'Validation Error';
    }
}

export class HttpError extends Error {
    code: Number;
    message: string;
    constructor(code, message) {
        super();
        this.code = code || 500;
        this.message = message || 'Http Error';

    }
}

export const handleHttpError = (err, res) => {
    const { code, message } = err;

    res.status(code || 500).json({
        message,
    });
};

export default { ServerError, handleHttpError };
