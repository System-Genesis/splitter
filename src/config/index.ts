


import {dataSources} from "./dataSources"
import './dotenv'

import * as env from 'env-var';

export const configEnv = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    proxy: {
        souf_uri: env.get('SOUF_URI').required().asUrlString(),
        aka_uri: env.get('AKA_URI').required().asUrlString(),
        eight_socks_uri: env.get('EIGHT_SOCKS_URI').required().asUrlString(),
        city_uri: env.get('CITY_URI').required().asUrlString(),
        ad_nn_uri: env.get('AD_NN_URI').required().asUrlString(),
        isMock: env.get('PROXY_MOCK').required().asBool(),
    },
    rabbit: {

        uri: env.get('MATCH_TO_KART_RABBIT_URI').required().asString(),
        beforeMatchQName: env.get('BEFORE_MATCH_QUEUE_NAME').required().asString(),
        retryOptions: {
            minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
            retries: env.get('RABBIT_RETRY_RETRIES').default(10).asIntPositive(),
            factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
        },
        isMockMatchToKart: env.get('RABBIT_MOCK_MATCH_TO_KART').required().asBool(),
        
    },
    logger:{
        mock: env.get('LOGGER_MOCK').required().asBool(),
    },
    dataSources,
    token:{
        isMockSpikeToMe: env.get('SPIKE_MOCK_TO_ME').required().asBool(),
        isMockSpikeToDS: env.get('SPIKE_MOCK_TO_DS_SERVICE').required().asBool(),
        redisUrl: env.get('REDIS_URL').required().asString(),
        spikeUrl: env.get('SPIKE_URL').required().asString(),
        clientID: env.get('SPIKE_CLIENT_ID').required().asString(),
        clientSecret: env.get('SPIKE_CLIENT_SECRET').required().asString(),
        audience: env.get('AUDIENCE').required().asString(),

        audeienceAka: env.get('AUDIENCE_AKA').required().asString(),

        audeienceSouf: env.get('AUDIENCE_SOUF').required().asString(),

        audeienceCity: env.get('AUDIENCE_CITY').required().asString(),

        audeienceEightSocks: env.get('AUDIENCE_EIGHT_SOCKS').required().asString(),

        audeienceADnn: env.get('AUDIENCE_AD_NN').required().asString(),

    }

};
export const existingParams = ["personalNumber","identityCard","domainUser"];

const obj:Map<string,string> = new Map();
obj.set(dataSources.aka, configEnv.proxy.aka_uri);
obj.set(dataSources.city,configEnv.proxy.city_uri);
obj.set(dataSources.sf,configEnv.proxy.souf_uri);
obj.set(dataSources.es,configEnv.proxy.eight_socks_uri);
obj.set(dataSources.adNN, configEnv.proxy.ad_nn_uri);

const config= Object.assign(configEnv,{urlSources: obj})
export default config;
