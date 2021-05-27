import  getTokenCreator from "spike-get-token";
import options from '../config/getDSToken';
import config from '../config/index';
import {dataSources} from '../config/dataSources';

let getTokenAka;
let getTokenSouf;
let getTokenCity;
let getTokenEightSocks;
let getTokenADNN;
let getTokenADS;
export const getSpikeTokenAka = async () => {
    return await getTokenAka();
}
export const getSpikeTokenSouf = async () => {
    return await getTokenSouf();
}
export const getSpikeTokenCity = async () => {
    return await getTokenCity();
}

export const getSpikeTokenEightSocks = async () => {
    return await getTokenEightSocks();
}
export const getSpikeTokenADS = async () => {
    return await getTokenADS();
}
export const getSpikeTokenADnn= async () => {
    return await getTokenADNN();
}

export const configureSpikeRedis = () => {

    getTokenAka = getTokenCreator(options(config.token.clientID,config.token.clientSecret,config.token.audeienceAka,"tokenAka"));

    getTokenSouf= getTokenCreator(options(config.token.clientID,config.token.clientSecret,config.token.audeienceSouf,"tokenSouf"));

    getTokenCity= getTokenCreator(options(config.token.clientID,config.token.clientSecret,config.token.audeienceCity,"tokenCity"));

    getTokenEightSocks = getTokenCreator(options(config.token.clientID,config.token.clientSecret,config.token.audeienceEightSocks,"tokenEightSocks"));

    getTokenADS= getTokenCreator(options(config.token.clientID,config.token.clientSecret,config.token.audeienceADS,"tokenADS"));

    getTokenADNN= getTokenCreator(options(config.token.clientID,config.token.clientSecret,config.token.audeienceADnn,"tokenADnn"));


}
export const getSpikeToken = async(dataSourceName:string) =>{
    switch (dataSourceName) {
        case dataSources.aka:
            return await getSpikeTokenAka();
        case dataSources.sf:
            return await getSpikeTokenSouf();
        case dataSources.city:
            return await getSpikeTokenCity();
        case dataSources.es:
            return await getSpikeTokenEightSocks();
        case dataSources.ads:
            return await getSpikeTokenADS();
        case dataSources.adNN:
            return await getSpikeTokenADnn(); 
    
        default:
            return null;
    }
}



export default { configureSpikeRedis ,getSpikeToken, getSpikeTokenAka,getSpikeTokenSouf, getSpikeTokenCity,getSpikeTokenEightSocks }
