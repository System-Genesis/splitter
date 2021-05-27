import jwt from 'jsonwebtoken';
import util from 'util';
import fs from 'fs';
import path from 'path';
import { HttpError } from '../../helpers/errorHandler'
import config from '../../config/index';
import { NextFunction, Request,Response } from 'express';

const averify = util.promisify(jwt.verify);

export const isAuth = async (req :Request, _:Response, next: NextFunction) => {

    if(config.token.isMockSpikeToMe) return next();
    

    const token = req.header('Authorization');
    const key = fs.readFileSync(path.join(__dirname, '../../config/key.pem'));
    
    try {
        const payload = await averify(token, key.toString()).catch((_: any) => { throw new HttpError(401, 'Unauthorized'); });
        if(payload.aud !== config.token.audience)
            throw new HttpError(401, 'Unauthorized');
        
        return next();
    }
    catch(err) {
        return next(err);
    }
}


export default { isAuth }