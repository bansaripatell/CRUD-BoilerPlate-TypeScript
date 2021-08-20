import { GeneralResponse } from '../utils/response';
import { NextFunction, Request, Response } from 'express';
import config from '../utils/config';

const handleResponse = (response: { message: any; result: any; }, req : Request, res : Response, next : NextFunction) => {
    if (response instanceof GeneralResponse) {
        return res.status(config.HTTP_SUCCESS).json({
            status: config.SUCCESS,
            code: config.HTTP_SUCCESS,
            message: response.message,
            result: response.result});
    }
    next(response);
    return 0;
};

export { handleResponse };