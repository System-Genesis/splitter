
import { Request } from 'express';

import config from '../../config/index'
import {ValidationError} from '../../helpers/errorHandler'

export class InformationValidator {
    static async dataSourceExistence(_req: Request) {
        let key : any =_req.body.dataSource;
        if(!config.urlSources.has(key)){
            throw new ValidationError(400,"Datasource does not exist in config!")
        }
    }

}

export default InformationValidator;
