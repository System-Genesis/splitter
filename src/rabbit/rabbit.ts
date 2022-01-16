import menash from 'menashmq';
import config from '../config/index';

export const connectRabbit = async () => {
    if (config.rabbit.isMockMatchToKart) {
        return;
    }
    console.log('Connecting to Rabbit...');
    await menash.connect(config.rabbit.uri, config.rabbit.retryOptions);
    console.log('Rabbit connected');
    await menash.declareQueue(config.rabbit.beforeMatchQName);

};
export const sendRecordToMatch = async (record: any, dataSource: any,runUID:any) => {
    await menash.send(config.rabbit.beforeMatchQName, { record: record, dataSource: dataSource, runUID:runUID });
};

export const sendRecordToLogger = async (level: string, message: string,extrasFields:any =undefined) => {
    await menash.send("logger", { level: level, message: message, system:"karting" ,service:"splitter",extrasFields:extrasFields});
};

export default { connectRabbit, sendRecordToMatch ,sendRecordToLogger};
