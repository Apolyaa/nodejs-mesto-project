import ERROR_MESSAGES from './consts/errorMessages';
import STATUS_CODE from './consts/statusCodes';

class ResponseError extends Error {
  status: number;

  constructor({ message, status }: {
    message: string,
    status: number
  }) {
    super(message);
    this.status = status;
  }

  static getInternalError() {
    return new ResponseError({
      message: ERROR_MESSAGES.internalError,
      status: STATUS_CODE.internalError,
    });
  }
}

export default ResponseError;