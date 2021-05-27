import { Request } from "express";
import {existingParams} from '../config/dataSources';
import { InformationProxy } from '../express/information/proxy';

export default function createParamsPromises(req:Request, dataSource:string){
    let promiseAllParams:Promise<any>[] = [];


    const foundAParameter = Object.keys(req.body).some(r=> existingParams.includes(r))
    if(!foundAParameter){
        promiseAllParams.push( new Promise(async(resolve,_)=>{
            let data = await InformationProxy.getInformation(dataSource,"","").catch((_)=> resolve([]))
            
            resolve(data);
        }));

        return promiseAllParams;

    }
    Object.keys(req.body).forEach(function(key){ 

        if(existingParams.includes(key)){
            promiseAllParams.push(new Promise(async(resolve,_)=>{
                let data = await InformationProxy.getInformation(dataSource,key,req.body[key]).catch((_)=> resolve([]))
                resolve(data);
            }));
            
            
        }
     })

    return promiseAllParams;

}