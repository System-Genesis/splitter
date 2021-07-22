import { Request, Response } from 'express';
import config from '../../config/index';
import {sendRecordToMatch} from '../../rabbit/rabbit';
import mock from '../../config/mocks.json';
import createParamsPromises from '../../utils/createParamsPromises';
import promiseAllWithFails from '../../utils/promiseAllWithFails';
import {dataSources} from '../../config/dataSources'
 
export class InformationController {
    static async getInformation(req: Request, res: Response) {
        if (config.proxy.isMock) {
            res.json(mock);
            return;
        }

        const dataSource:string =req.body.dataSource?.toString();
        const runUID:string =req.body.runUID.toString();
        let resultsPromises:any = createParamsPromises(req,dataSource);
        

        promiseAllWithFails(resultsPromises,undefined).then((results)=>{
            let data:any =[];
            for (let res of results) {             
                
                if((Array.isArray((res as any).records) && (res as any).records.length>0) ||  typeof (res as any).records === "object" ){
                   
                    data = res;
                    break;
                }
            }
            
            if(!config.rabbit.isMockMatchToKart){
                
                if(!(Array.isArray(data.records))){
                    sendRecordToMatch(data.records, dataSource, runUID)
                }else{
                    for (let index = 0; index < data.records.length; index++) {
                        sendRecordToMatch(data.records[index], dataSource, runUID)
                        
                    }
                }

            }
            
            return data;
        }).catch((err)=> {throw err})
        res.json("ok")
    }
    static async getInformationAll(req: Request, res: Response) {
        if (config.proxy.isMock) {
            res.json(mock);
            return;
        }

        
        const runUID:string =req.body.runUID.toString();
        let allDSresPromises = [];
        for (let dataSource in dataSources ){
            let resultsPromises:any = createParamsPromises(req,dataSource);
            allDSresPromises = allDSresPromises.concat(resultsPromises)
        }
        
        

        promiseAllWithFails(allDSresPromises,undefined).then((results)=>{
            let data:any =[];
            for (let res of results) {             
                
                if((Array.isArray((res as any).records) && (res as any).records.length>0) ||  typeof (res as any).records === "object" ){
                   
                    data = res;
                    break;
                }
            }
            
            if(!config.rabbit.isMockMatchToKart){
                
                if(!(Array.isArray(data))){
                    sendRecordToMatch(data.records, data.source, runUID)
                }else{
                    for (let index = 0; index < (data as any).records.length; index++) {
                        sendRecordToMatch((data as any).records[index], (data as any).source, runUID)
                        
                    }
                }

            }
            
            return data;
        }).catch((err)=> {throw err})
        res.json("ok")
    }

    

}

export default InformationController;
