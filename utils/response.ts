import config from './config';

class GeneralResponse {
    message: string;
    statusCode: number;
    result: any;
    constructor(message: string,result: any,statusCode : any = '') {
        this.message = message;
        if(statusCode === ''){
            statusCode = config.HTTP_SUCCESS;
        }
        this.statusCode = statusCode;
        this.result = result;
    }
}

export {GeneralResponse};
