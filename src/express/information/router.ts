import { Router } from 'express';
import InformationController from './controller';
// import InformationValidator from './validator';
import { wrapController } from '../../utils/express'; //wrapValidator
import ValidateRequest from '../../utils/joi';
import { getInformationRequestSchema} from './validator.schema';
import {isAuth} from './auth'

const informationRouter: Router = Router();

informationRouter.post('/information',isAuth, ValidateRequest(getInformationRequestSchema), wrapController(InformationController.getInformation));
informationRouter.post('/informationToMe',isAuth, ValidateRequest(getInformationRequestSchema), wrapController(InformationController.getInformationWithoutSending));

export default informationRouter;
