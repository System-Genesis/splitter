import http from 'http';
import express from 'express';
// import * as helmet from 'helmet';
// import * as logger from 'morgan';
import { connectRabbit } from '../rabbit/rabbit';
import { once } from 'events';
import { errorMiddleware } from './error';
import appRouter from './router';
import { configureSpikeRedis } from '../spike/spike';

class Server {
    public app: express.Application;

    private http: http.Server;

    private port: number;

    constructor(port: number) {
        this.app = Server.createExpressApp();
        this.port = port;
    }

    static createExpressApp() {
        const app = express();

        //app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        //app.use(logger('dev'));
        app.use(appRouter);

        app.use(errorMiddleware);

        return app;
    }

    async start() {
        await connectRabbit();
        configureSpikeRedis();
        this.http = this.app.listen(this.port);
        
        
        await once(this.http, 'listening');
    }
}

export default Server;
