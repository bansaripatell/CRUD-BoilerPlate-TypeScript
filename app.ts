import express from 'express';
import helmet from 'helmet';
import { Routes } from './interface/routes.interface';
import winston from 'winston';
import { handleResponse as resHelper } from './helper/response.helper';
import error from './helper/error.helper';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from 'config'


class App {
    public app: express.Application;
    public port: string | number;
    public env: string;
  
    constructor(routes: Routes[]) {
      
      this.app = express();
      this.port = process.env.PORT || 3000;
      this.env = process.env.NODE_ENV || 'development';
      
      this.initializeMiddlewares();
      this.initializeRoutes(routes);
      this.initializeHelper();
      
      
    }
  
    public listen() {
      this.app.listen(this.port, () => {
        winston.info(`=================================`);
        winston.info(`======= ENV: ${this.env} =======`);
        winston.info(`🚀 App listening on the port ${this.port}`);
        winston.info(`=================================`);
      });
    }
  
    public getServer() {
      return this.app;
    }
  
    private initializeMiddlewares() {
      this.app.use(helmet());
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: true}));
      this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
      this.app.use(bodyParser.json({ limit: '50mb' }));
      this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    }
  
    private initializeRoutes(routes: Routes[]) {
      routes.forEach(route => {
        this.app.use('/api/route', route.router);
      });
      
    }

    private initializeHelper(){
      this.app.use(resHelper);
      this.app.use(error.handleJoiErrors); 
      this.app.use(error.handleErrors);
      
    }
}
  
export default App;