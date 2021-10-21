import { Request, Response } from "express";
import config from "../../config/index";
import { sendRecordToMatch } from "../../rabbit/rabbit";
import mock from "../../config/mocks.json";
import createParamsPromises from "../../utils/createParamsPromises";
//import promiseAllWithFails from "../../utils/promiseAllWithFails";
import { dataSources } from "../../config/dataSources";

const stringToArray: any = (source: [] | string) => {
  if (!Array.isArray(source)) return [source];

  return source;
};

export class InformationController {
  static async getInformation(req: Request, res: Response) {
    if (config.proxy.isMock) {
      res.json(mock);
      return;
    }

    const sourcesToCheck: string[] = stringToArray(req.body.dataSource);
    let allDSresPromises: Promise<any>[] = [];
    for (let i = 0; i < sourcesToCheck.length; i += 1) {
      if (sourcesToCheck[i] === "all") {
        for (let dataSource in dataSources) {
          if (config.urlSources.has(dataSources[dataSource])) {
            let resultsPromises: any = createParamsPromises(
              req,
              dataSources[dataSource]
            );
            allDSresPromises = allDSresPromises.concat(resultsPromises);
          }
        }
      } else {
        let resultsPromises: any = createParamsPromises(req, sourcesToCheck[i]);
        allDSresPromises = allDSresPromises.concat(resultsPromises);
      }
    }
    const runUID: string = req.body.runUID.toString();
    res.json("Sent Successfully!");
    for (let i = 0; i < allDSresPromises.length; i++) {
      try {
        const res = await allDSresPromises[i];
        let data: any = [];

        if (
          (Array.isArray((res as any).records) &&
            (res as any).records.length > 0) ||
          typeof (res as any).records === "object"
        ) {
          data = res;
          if (!config.rabbit.isMockMatchToKart) {
            if (!Array.isArray(data.records)) {
              sendRecordToMatch(data.records, data.source, runUID);
            } else {
              for (let index = 0; index < data.records.length; index++) {
                sendRecordToMatch(data.records[index], data.source, runUID);
              }
            }
          }
        }
        console.log(data);
      } catch (err) {
        throw err;
      }
    }

    // promiseAllWithFails(allDSresPromises,undefined).then((results)=>{
    //     let data:any =[];
    //     for (let res of results) {

    //         if((Array.isArray((res as any).records) && (res as any).records.length>0) ||  typeof (res as any).records === "object" ){

    //             data = res;
    //             if(!config.rabbit.isMockMatchToKart){

    //                 if(!(Array.isArray(data.records))){
    //                     sendRecordToMatch(data.records, data.source, runUID)
    //                 }else{
    //                     for (let index = 0; index < data.records.length; index++) {
    //                         sendRecordToMatch(data.records[index], data.source, runUID)

    //                     }
    //                 }

    //             }

    //         }
    //     }

    //     return data;
    // }).catch((err)=> {throw err})
    // res.json("ok")
  }
  static async getInformationWithoutSending(req: Request, res: Response) {
    if (config.proxy.isMock) {
      res.json(mock);
      return;
    }

    const sourcesToCheck: string[] = stringToArray(req.body.dataSource);
    let allDSresPromises: Promise<any>[] = [];
    for (let i = 0; i < sourcesToCheck.length; i += 1) {
      if (sourcesToCheck[i] === "all") {
        for (let dataSource in dataSources) {
          if (config.urlSources.has(dataSources[dataSource])) {
            let resultsPromises: any = createParamsPromises(
              req,
              dataSources[dataSource]
            );
            allDSresPromises = allDSresPromises.concat(resultsPromises);
          }
        }
      } else {
        let resultsPromises: any = createParamsPromises(req, sourcesToCheck[i]);
        allDSresPromises = allDSresPromises.concat(resultsPromises);
      }
    }
    const runUID: string = req.body.runUID.toString();
    const finalResults: any[] = [];
    for (let i = 0; i < allDSresPromises.length; i++) {
      try {
        const res = await allDSresPromises[i];
        let data: any = [];

        if (
          (Array.isArray((res as any).records) &&
            (res as any).records.length > 0) ||
          typeof (res as any).records === "object"
        ) {
          data = res;

          if (!Array.isArray(data.records)) {
            finalResults.push({
              record: data.records,
              dataSource: data.source,
              runUID: runUID,
            });
          } else {
            for (let index = 0; index < data.records.length; index++) {
              finalResults.push({
                record: data.records[index],
                dataSource: data.source,
                runUID: runUID,
              });
            }
          }
        }
      } catch (err) {
        throw err;
      }
    }
    res.json(finalResults);
  }
}

export default InformationController;
