"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const index_1 = __importDefault(require("./index"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const options = (clientID, clientSecret, tokenAudience, tokenKeyName) => {
    return {
        redisHost: index_1.default.token.redisUrl,
        clientId: clientID,
        clientSecret: clientSecret,
        spikeURL: index_1.default.token.spikeUrl,
        tokenGrantType: 'client_credentials',
        tokenAudience: tokenAudience,
        tokenRedisKeyName: tokenKeyName,
        spikePublicKeyFullPath: path_1.default.join(process_1.default.cwd(), './key.pem'),
        useRedis: true,
        httpsValidation: false,
    };
};
exports.options = options;
exports.default = exports.options;
//# sourceMappingURL=getDSToken.js.map