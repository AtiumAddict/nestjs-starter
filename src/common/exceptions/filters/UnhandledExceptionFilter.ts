// @ts-nocheck
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import ErrorCodes from '../errorCodes'
import { Response } from 'express'
import AbstractHttpException from '../AbstractHttpException'
import { NodeEnv } from '../../common.enums'

@Catch()
export class UnhandledExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnhandledExceptionFilter.name)

  catch(exception: AbstractHttpException | unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    this.logger.error(exception)
    if (exception.errorCode) {
      response.status(exception.errorCode?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
        ...exception.errorCode,
        params: exception.params,
        statusCode: exception.errorCode?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      })
      return
    }
    if (exception.response?.statusCode === HttpStatus.BAD_REQUEST) {
      const responseBody =
        process.env.NODE_ENV === NodeEnv.Production ? { statusCode: HttpStatus.BAD_REQUEST } : exception.response
      response.status(HttpStatus.BAD_REQUEST).json(responseBody)
      return
    }
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const responseBody = {
      ...ErrorCodes.GENERIC__ERROR,
      timestamp: new Date().toISOString()
    }

    response.status(statusCode).json(responseBody)
  }
}
