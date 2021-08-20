import {GeneralError, BadRequest} from '../utils/error';
import config from '../utils/config';
import { NextFunction, Request, Response } from 'express';

const handleErrors = (err: { statusCode: string | number; getCode: () => number; message: any; result: string; }, req: Request, res: Response, next: NextFunction) => {
  next();
  if (err instanceof GeneralError) {
    
    return res.status(err.statusCode !== config.Nothing ? err.statusCode : err.getCode()).json({
      status: config.ERROR,
      code: err.statusCode !== config.Nothing ? err.statusCode : err.getCode(),
      message: err.message,
      result: err.result !== "" ? err.result : undefined,
    });
  }

  return res.status(config.HTTP_SERVER_ERROR).json({
    status: config.ERROR,
    code: err.statusCode !== "" ? err.statusCode : config.HTTP_SERVER_ERROR,
    message: err.message,
  });
  
};

const handleJoiErrors = (err : any, req: Request, res : Response, next : NextFunction) => {
  if (err && err.error && err.error.isJoi) {
    
    const customErrorResponse: any = {};
    if (err.error.details.length !== 0) {
      console.log(err.error.details);
      
      err.error.details.forEach((item: { context: { key: string; label: any; }; message: any; type: any; }) => {
        console.log(item);
        
        customErrorResponse[`${item.context.key}`] = {
              message: item.message,
              context: item.context.label,
              type: item.type};
      });
    }
    console.log(customErrorResponse);
    
    next(new BadRequest('Validation Error', customErrorResponse));
   } else {
    next(err);
  }
};

export default { handleErrors, handleJoiErrors };
