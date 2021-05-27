import { Router } from 'express';
import InformationController from './controller';
import InformationValidator from './validator';
import { wrapController, wrapValidator } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import { getInformationRequestSchema, } from './validator.schema';
import {isAuth} from './auth'

const informationRouter: Router = Router();

informationRouter.post('/information',isAuth, ValidateRequest(getInformationRequestSchema), wrapValidator(InformationValidator.dataSourceExistence), wrapController(InformationController.getInformation));

export default informationRouter;
