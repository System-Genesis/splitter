import config from './index';
import path from "path";

export const options= (clientID:string,clientSecret:string,tokenAudience:string, tokenKeyName:string) =>{
    return{
    redisHost: config.token.redisUrl,
    clientId: clientID,
    clientSecret: clientSecret,
    spikeURL: config.token.spikeUrl,
    tokenGrantType: 'client_credentials',
    tokenAudience: tokenAudience,
    tokenRedisKeyName: tokenKeyName,
    spikePublicKeyFullPath: path.join(__dirname, '../key/key.pem'),
    useRedis: true,
    httpsValidation: false,
    }
    
}

export default options;
