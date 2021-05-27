"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttpError = exports.HttpError = exports.ValidationError = exports.ServerError = void 0;
class ServerError extends Error {
    constructor(code, message) {
        super();
        this.code = code || 500;
        this.message = message || 'Server Error';
    }
}
exports.ServerError = ServerError;
class ValidationError extends Error {
    constructor(code, message) {
        super();
        this.code = code || 500;
        this.message = message || 'Validation Error';
    }
}
exports.ValidationError = ValidationError;
class HttpError extends Error {
    constructor(code, message) {
        super();
        this.code = code || 500;
        this.message = message || 'Http Error';
    }
}
exports.HttpError = HttpError;
const handleHttpError = (err, res) => {
    const { code, message } = err;
    res.status(code || 500).json({
        message,
    });
};
exports.handleHttpError = handleHttpError;
exports.default = { ServerError, handleHttpError: exports.handleHttpError };
//# sourceMappingURL=errorHandler.js.map