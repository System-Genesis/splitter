"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("../../helpers/errorHandler");
const index_1 = __importDefault(require("../../config/index"));
const averify = util_1.default.promisify(jsonwebtoken_1.default.verify);
const isAuth = async (req, _, next) => {
    if (index_1.default.token.isMockSpikeToMe)
        return next();
    const token = req.header('Authorization');
    const key = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../config/key.pem'));
    try {
        const payload = await averify(token, key.toString()).catch((_) => { throw new errorHandler_1.HttpError(401, 'Unauthorized'); });
        if (payload.aud !== index_1.default.token.audience)
            throw new errorHandler_1.HttpError(401, 'Unauthorized');
        return next();
    }
    catch (err) {
        return next(err);
    }
};
exports.isAuth = isAuth;
exports.default = { isAuth: exports.isAuth };
//# sourceMappingURL=auth.js.map