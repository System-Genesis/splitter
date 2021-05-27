"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataSources_1 = require("../config/dataSources");
const proxy_1 = require("../express/information/proxy");
function createParamsPromises(req, dataSource) {
    let promiseAllParams = [];
    const foundAParameter = Object.keys(req.body).some(r => dataSources_1.existingParams.includes(r));
    if (!foundAParameter) {
        promiseAllParams.push(new Promise(async (resolve, _) => {
            let data = await proxy_1.InformationProxy.getInformation(dataSource, "", "").catch((_) => resolve([]));
            resolve(data);
        }));
        return promiseAllParams;
    }
    Object.keys(req.body).forEach(function (key) {
        if (dataSources_1.existingParams.includes(key)) {
            promiseAllParams.push(new Promise(async (resolve, _) => {
                let data = await proxy_1.InformationProxy.getInformation(dataSource, key, req.body[key]).catch((_) => resolve([]));
                resolve(data);
            }));
        }
    });
    return promiseAllParams;
}
exports.default = createParamsPromises;
//# sourceMappingURL=createParamsPromises.js.map