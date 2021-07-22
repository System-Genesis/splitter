import { Request } from "express";
import {existingParams} from '../config/index';
import { InformationProxy } from '../express/information/proxy';

export default function createParamsPromises(req:Request, dataSource:string){
    let promiseAllParams:Promise<any>[] = [];


    const foundAParameter = Object.keys(req.body).some(r=> existingParams.includes(r))
    if(!foundAParameter){
        promiseAllParams.push( new Promise(async(resolve,_)=>{
            let data = await InformationProxy.getInformation(dataSource,"","").catch((_)=> resolve({records: [], source: dataSource}))
            
            resolve({records: data, source: dataSource});
        }));

        return promiseAllParams;

    }
    Object.keys(req.body).forEach(function(key){ 

        if(existingParams.includes(key)){
            promiseAllParams.push(new Promise(async(resolve,_)=>{
                let data = await InformationProxy.getInformation(dataSource,key,req.body[key]).catch((_)=> resolve({records: [], source: dataSource}))
                resolve({records: data, source: dataSource});
            }));
            
            
        }
     })

    return promiseAllParams;

}