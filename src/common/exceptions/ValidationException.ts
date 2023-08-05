import AbstractHttpException from './AbstractHttpException'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { HttpStatus } from '../common.enums'

export default class ValidationException extends AbstractHttpException {
  errorCode: ErrorCode

  constructor(errorCode, params?) {
    super(errorCode?.userMessage || errorCode?.userTitle, params, HttpStatus.UNAUTHORIZED)
    this.name = this.constructor.name
    this.errorCode = errorCode
    Object.setPrototypeOf(this, ValidationException.prototype)
  }
}

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ ...exception.errorCode, params: exception.params, statusCode: HttpStatus.UNPROCESSABLE_ENTITY })
  }
}
