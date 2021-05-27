"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./express/server"));
const config_1 = __importDefault(require("./config"));
const { service } = config_1.default;
const main = async () => {
    const server = new server_1.default(service.port);
    console.log('Starting server...');
    await server.start();
    console.log(`Server started on port: ${service.port}`);
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map