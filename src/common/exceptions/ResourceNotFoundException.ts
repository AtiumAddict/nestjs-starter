import AbstractHttpException from './AbstractHttpException'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { HttpStatus } from '../common.enums'

export default class ResourceNotFoundException extends AbstractHttpException {
  errorCode: ErrorCode

  constructor(errorCode, params?) {
    super(errorCode?.userMessage || errorCode?.userTitle, params, HttpStatus.UNAUTHORIZED)
    this.name = this.constructor.name
    this.errorCode = errorCode
    Object.setPrototypeOf(this, ResourceNotFoundException.prototype)
  }
}

@Catch(ResourceNotFoundException)
export class ResourceNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: ResourceNotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response
      .status(HttpStatus.NOT_FOUND)
      .json({ ...exception.errorCode, params: exception.params, statusCode: HttpStatus.NOT_FOUND })
  }
}
