"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validator_1 = __importDefault(require("./validator"));
const express_2 = require("../../utils/express");
const joi_1 = __importDefault(require("../../utils/joi"));
const validator_schema_1 = require("./validator.schema");
const auth_1 = require("./auth");
const informationRouter = express_1.Router();
informationRouter.post('/information', auth_1.isAuth, joi_1.default(validator_schema_1.getInformationRequestSchema), express_2.wrapValidator(validator_1.default.dataSourceExistence), express_2.wrapController(controller_1.default.getInformation));
exports.default = informationRouter;
//# sourceMappingURL=router.js.map