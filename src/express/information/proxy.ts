import axios from 'axios';

import config from '../../config/index';
import { ServerError } from '../../helpers/errorHandler';
import {getSpikeToken} from '../../spike/spike'

export class InformationProxy {
    static async getInformation(dataSource: any,parameter:string, value:any) {
        let headers={};

        if(!config.token.isMockSpikeToDS){
            const token = await getSpikeToken(dataSource).catch((_)=>{
                
                throw new ServerError(500, 'Redis token invalid');
            });
            if(token === null){
                throw new ServerError(500,'Data source doesn`t exist')
            }
            headers = { Authorization: token}
        }

        const persons: any = await axios.get(config.urlSources.get(dataSource)+"/"+parameter+"/"+value, {headers}).catch((_) => {
            throw new ServerError(500, 'Cannot connect with proxy');
        });
        if(persons === undefined || persons.data === undefined){
            return [];
        }
        return persons.data;
    }
}

export default InformationProxy;
