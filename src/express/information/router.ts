import { Router } from 'express';
import InformationController from './controller';
import InformationValidator from './validator';
import { wrapController, wrapValidator } from '../../utils/express';
import ValidateRequest from '../../utils/joi';
import { getInformationRequestSchema, getInformationRequestSchemaAll} from './validator.schema';
import {isAuth} from './auth'

const informationRouter: Router = Router();

informationRouter.post('/information',isAuth, ValidateRequest(getInformationRequestSchema), wrapValidator(InformationValidator.dataSourceExistence), wrapController(InformationController.getInformation));
informationRouter.post('/information/getAll',isAuth, ValidateRequest(getInformationRequestSchemaAll), wrapValidator(InformationValidator.allAlias), wrapController(InformationController.getInformationAll));

export default informationRouter;
