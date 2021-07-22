import axios from 'axios';

import config from '../../config/index';
import { ServerError } from '../../helpers/errorHandler';
import {getSpikeToken} from '../../spike/spike'
import {sendRecordToLogger} from '../../rabbit/rabbit'

export class InformationProxy {
    static async getInformation(dataSource: any,parameter:string, value:any) {
        let headers:any={};

        if(!config.token.isMockSpikeToDS){
            const token = await getSpikeToken(dataSource).catch((_)=>{
                if(!config.logger.mock){
                    sendRecordToLogger("error","Redis token invalid")
                    throw new ServerError(500, 'Redis token invalid');
                }
            });
            if(token === null){
                if(!config.logger.mock){
                    sendRecordToLogger("error","Datasource doesn`t exist")
                    throw new ServerError(500,'Data source doesn`t exist')
                }
            }
            headers = { Authorization: token}
        }

        const persons: any = await axios.get(config.urlSources.get(dataSource)+"/"+parameter+"/"+value, {headers}).catch((err) => {
            if(!config.logger.mock){
                sendRecordToLogger("error",err.message)
                throw new ServerError(500, err.message);
            }
        });
        if(persons === undefined || persons.data === undefined){
            return [];
        }
        return persons.data;
    }
}

export default InformationProxy;
