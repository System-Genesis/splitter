"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpikeToken = exports.configureSpikeRedis = exports.getSpikeTokenADnn = exports.getSpikeTokenADS = exports.getSpikeTokenEightSocks = exports.getSpikeTokenCity = exports.getSpikeTokenSouf = exports.getSpikeTokenAka = void 0;
const spike_get_token_1 = __importDefault(require("spike-get-token"));
const getDSToken_1 = __importDefault(require("../config/getDSToken"));
const index_1 = __importDefault(require("../config/index"));
const dataSources_1 = require("../config/dataSources");
let getTokenAka;
let getTokenSouf;
let getTokenCity;
let getTokenEightSocks;
let getTokenADNN;
let getTokenADS;
const getSpikeTokenAka = async () => {
    return await getTokenAka();
};
exports.getSpikeTokenAka = getSpikeTokenAka;
const getSpikeTokenSouf = async () => {
    return await getTokenSouf();
};
exports.getSpikeTokenSouf = getSpikeTokenSouf;
const getSpikeTokenCity = async () => {
    return await getTokenCity();
};
exports.getSpikeTokenCity = getSpikeTokenCity;
const getSpikeTokenEightSocks = async () => {
    return await getTokenEightSocks();
};
exports.getSpikeTokenEightSocks = getSpikeTokenEightSocks;
const getSpikeTokenADS = async () => {
    return await getTokenADS();
};
exports.getSpikeTokenADS = getSpikeTokenADS;
const getSpikeTokenADnn = async () => {
    return await getTokenADNN();
};
exports.getSpikeTokenADnn = getSpikeTokenADnn;
const configureSpikeRedis = () => {
    getTokenAka = spike_get_token_1.default(getDSToken_1.default(index_1.default.token.clientID, index_1.default.token.clientSecret, index_1.default.token.audeienceAka, "tokenAka"));
    getTokenSouf = spike_get_token_1.default(getDSToken_1.default(index_1.default.token.clientID, index_1.default.token.clientSecret, index_1.default.token.audeienceSouf, "tokenSouf"));
    getTokenCity = spike_get_token_1.default(getDSToken_1.default(index_1.default.token.clientID, index_1.default.token.clientSecret, index_1.default.token.audeienceCity, "tokenCity"));
    getTokenEightSocks = spike_get_token_1.default(getDSToken_1.default(index_1.default.token.clientID, index_1.default.token.clientSecret, index_1.default.token.audeienceEightSocks, "tokenEightSocks"));
    getTokenADS = spike_get_token_1.default(getDSToken_1.default(index_1.default.token.clientID, index_1.default.token.clientSecret, index_1.default.token.audeienceADS, "tokenADS"));
    getTokenADNN = spike_get_token_1.default(getDSToken_1.default(index_1.default.token.clientID, index_1.default.token.clientSecret, index_1.default.token.audeienceADnn, "tokenADnn"));
};
exports.configureSpikeRedis = configureSpikeRedis;
const getSpikeToken = async (dataSourceName) => {
    switch (dataSourceName) {
        case dataSources_1.dataSources.aka:
            return await exports.getSpikeTokenAka();
        case dataSources_1.dataSources.sf:
            return await exports.getSpikeTokenSouf();
        case dataSources_1.dataSources.city:
            return await exports.getSpikeTokenCity();
        case dataSources_1.dataSources.es:
            return await exports.getSpikeTokenEightSocks();
        case dataSources_1.dataSources.ads:
            return await exports.getSpikeTokenADS();
        case dataSources_1.dataSources.adNN:
            return await exports.getSpikeTokenADnn();
        default:
            return null;
    }
};
exports.getSpikeToken = getSpikeToken;
exports.default = { configureSpikeRedis: exports.configureSpikeRedis, getSpikeToken: exports.getSpikeToken, getSpikeTokenAka: exports.getSpikeTokenAka, getSpikeTokenSouf: exports.getSpikeTokenSouf, getSpikeTokenCity: exports.getSpikeTokenCity, getSpikeTokenEightSocks: exports.getSpikeTokenEightSocks };
//# sourceMappingURL=spike.js.map