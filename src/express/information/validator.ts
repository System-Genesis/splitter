
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
    static async allAlias(_req: Request) {
        let alias : any =_req.body.dataSource;
        if(alias!== 'all'){
            throw new ValidationError(400,"alias all not found")
        }
    }

}

export default InformationValidator;
