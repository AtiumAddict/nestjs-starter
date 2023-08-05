import AbstractHttpException from './AbstractHttpException'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { HttpStatus } from '../common.enums'

export default class AuthenticationException extends AbstractHttpException {
  errorCode: ErrorCode

  constructor(errorCode, params?) {
    super(errorCode?.userMessage || errorCode?.userTitle, params, HttpStatus.UNAUTHORIZED)
    this.name = this.constructor.name
    this.errorCode = errorCode
    Object.setPrototypeOf(this, AuthenticationException.prototype)
  }
}

@Catch(AuthenticationException)
export class AuthenticationExceptionFilter implements ExceptionFilter {
  catch(exception: AuthenticationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response
      .status(HttpStatus.UNAUTHORIZED)
      .json({ ...exception.errorCode, params: exception.params, statusCode: HttpStatus.UNAUTHORIZED })
  }
}
