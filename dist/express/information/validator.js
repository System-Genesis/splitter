"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformationValidator = void 0;
const index_1 = __importDefault(require("../../config/index"));
const errorHandler_1 = require("../../helpers/errorHandler");
class InformationValidator {
    static async dataSourceExistence(_req) {
        let key = _req.body.dataSource;
        if (!index_1.default.urlSources.has(key)) {
            throw new errorHandler_1.ValidationError(400, "Datasource does not exist in config!");
        }
    }
}
exports.InformationValidator = InformationValidator;
exports.default = InformationValidator;
//# sourceMappingURL=validator.js.map