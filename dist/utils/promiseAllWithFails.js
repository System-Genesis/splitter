"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function promiseAllWithFails(promiseArray, valueErr) {
    return await Promise.all(promiseArray.map(promise => promise.catch(err => (valueErr ? valueErr : err))));
}
exports.default = promiseAllWithFails;
;
//# sourceMappingURL=promiseAllWithFails.js.map