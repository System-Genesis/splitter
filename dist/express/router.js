"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = __importDefault(require("./information/router"));
const appRouter = express_1.Router();
appRouter.use('/api', router_1.default);
appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});
appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});
exports.default = appRouter;
//# sourceMappingURL=router.js.map