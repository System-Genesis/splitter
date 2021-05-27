"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformationController = void 0;
const index_1 = __importDefault(require("../../config/index"));
const rabbit_1 = require("../../rabbit/rabbit");
const mocks_json_1 = __importDefault(require("../../config/mocks.json"));
const createParamsPromises_1 = __importDefault(require("../../utils/createParamsPromises"));
const promiseAllWithFails_1 = __importDefault(require("../../utils/promiseAllWithFails"));
class InformationController {
    static async getInformation(req, res) {
        var _a;
        if (index_1.default.proxy.isMock) {
            res.json(mocks_json_1.default);
            return;
        }
        const dataSource = (_a = req.body.dataSource) === null || _a === void 0 ? void 0 : _a.toString();
        const runUID = req.body.runUID.toString();
        let resultsPromises = createParamsPromises_1.default(req, dataSource);
        promiseAllWithFails_1.default(resultsPromises, undefined).then((results) => {
            let data = [];
            for (let res of results) {
                if (res !== undefined && res !== []) {
                    data = res;
                    break;
                }
            }
            if (!index_1.default.rabbit.isMockMatchToKart) {
                for (let index = 0; index < data.length; index++) {
                    rabbit_1.sendRecordToMatch(data[index], dataSource, runUID);
                }
            }
            return data;
        }).catch((err) => { throw err; });
        res.json("ok");
    }
}
exports.InformationController = InformationController;
exports.default = InformationController;
//# sourceMappingURL=controller.js.map