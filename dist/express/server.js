"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rabbit_1 = require("../rabbit/rabbit");
const events_1 = require("events");
const error_1 = require("./error");
const router_1 = __importDefault(require("./router"));
const spike_1 = require("../spike/spike");
class Server {
    constructor(port) {
        this.app = Server.createExpressApp();
        this.port = port;
    }
    static createExpressApp() {
        const app = express_1.default();
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(router_1.default);
        app.use(error_1.errorMiddleware);
        return app;
    }
    async start() {
        await rabbit_1.connectRabbit();
        spike_1.configureSpikeRedis();
        this.http = this.app.listen(this.port);
        await events_1.once(this.http, 'listening');
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map