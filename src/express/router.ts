import { Router } from 'express';
import checkConnections from '../utils/checkConnections';
import informationRouter from './information/router';

const appRouter = Router();

appRouter.use('/api', informationRouter);

appRouter.use('/isAlive', (_req, res) => {
    res.send(checkConnections() ? 'OK' : 'Not OK')
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
