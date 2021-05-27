"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRecordToMatch = exports.connectRabbit = void 0;
const menashmq_1 = __importDefault(require("menashmq"));
const index_1 = __importDefault(require("../config/index"));
const connectRabbit = async () => {
    if (index_1.default.rabbit.isMockMatchToKart) {
        return;
    }
    console.log('Connecting to Rabbit...');
    await menashmq_1.default.connect(index_1.default.rabbit.uri, index_1.default.rabbit.retryOptions);
    console.log('Rabbit connected');
    await menashmq_1.default.declareQueue(index_1.default.rabbit.beforeMatchQName);
};
exports.connectRabbit = connectRabbit;
const sendRecordToMatch = async (record, dataSource, runUID) => {
    await menashmq_1.default.send(index_1.default.rabbit.beforeMatchQName, { record: record, dataSource: dataSource, runUID: runUID });
};
exports.sendRecordToMatch = sendRecordToMatch;
exports.default = { connectRabbit: exports.connectRabbit, sendRecordToMatch: exports.sendRecordToMatch };
//# sourceMappingURL=rabbit.js.map