import config  from './config';

export class GeneralError extends Error {
    statusCode: number;
    result: string;

  constructor(message: string, result = '', statusCode = config.Nothing) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    if(result === ''){
      result = '';
    }
    this.result = result;

    Object.setPrototypeOf(this, GeneralError.prototype);
    
  }

  getCode() {
    if (this instanceof BadRequest) {
      return config.HTTP_BAD_REQUEST;
    } else if (this instanceof NotFound) {
      return config.HTTP_NOT_FOUND;
    } else if (this instanceof UnAuthorized) {
      return config.HTTP_UN_AUTHORIZED;
    } else if (this instanceof ServiceNotAvailable) {
      return config.HTTP_SERVICE_NOT_AVAILABLE;
    }else{
      return config.HTTP_SERVER_ERROR;
    }
  }
}
export class BadRequest extends GeneralError {
  constructor(message: string, result = '', statusCode = config.Nothing){
    super(message, result, statusCode);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}
class NotFound extends GeneralError {
  constructor(message: string, result = '', statusCode = config.Nothing){
    super(message, result, statusCode);
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}
class UnAuthorized extends GeneralError {
  constructor(message: string, result = '', statusCode = config.Nothing){
    super(message, result, statusCode);
    Object.setPrototypeOf(this, UnAuthorized.prototype);
  }
}
class ServiceNotAvailable extends GeneralError {
  constructor(message: string, result = '', statusCode = config.Nothing){
    super(message, result, statusCode);
    Object.setPrototypeOf(this, ServiceNotAvailable.prototype);
  }
}

export default {
  GeneralError,
  BadRequest,
  NotFound,
  UnAuthorized,
  ServiceNotAvailable};
