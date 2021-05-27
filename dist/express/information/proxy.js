"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformationProxy = void 0;
const axios_1 = __importDefault(require("axios"));
const index_1 = __importDefault(require("../../config/index"));
const errorHandler_1 = require("../../helpers/errorHandler");
const spike_1 = require("../../spike/spike");
class InformationProxy {
    static async getInformation(dataSource, parameter, value) {
        let headers = {};
        if (!index_1.default.token.isMockSpikeToDS) {
            const token = await spike_1.getSpikeToken(dataSource).catch((_) => {
                throw new errorHandler_1.ServerError(500, 'Redis token invalid');
            });
            if (token === null) {
                throw new errorHandler_1.ServerError(500, 'Data source doesn`t exist');
            }
            headers = { Authorization: token };
        }
        const persons = await axios_1.default.get(index_1.default.urlSources.get(dataSource) + "/" + parameter + "/" + value, { headers }).catch((_) => {
            throw new errorHandler_1.ServerError(500, 'Cannot connect with proxy');
        });
        if (persons === undefined || persons.data === undefined) {
            return [];
        }
        return persons.data;
    }
}
exports.InformationProxy = InformationProxy;
exports.default = InformationProxy;
//# sourceMappingURL=proxy.js.map