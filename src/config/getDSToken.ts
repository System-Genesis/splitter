import config from './index';
import path from "path";
import process from "process";



export const options= (clientID:string,clientSecret:string,tokenAudience:string, tokenKeyName:string) =>{
    return{
    redisHost: config.token.redisUrl,
    clientId: clientID,
    clientSecret: clientSecret,
    spikeURL: config.token.spikeUrl,
    tokenGrantType: 'client_credentials',
    tokenAudience: tokenAudience,
    tokenRedisKeyName: tokenKeyName,
    spikePublicKeyFullPath: path.join(process.cwd(), './key.pem'),
    useRedis: true,
    httpsValidation: false,
    }
    
}

export default options;