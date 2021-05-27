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

export default { connectRabbit, sendRecordToMatch };
