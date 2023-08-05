import { v4 as uuid } from 'uuid'
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { HttpHeaders } from '../common.enums'

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private logger = new Logger(RequestMiddleware.name)
  use(req: AuthenticatedExpressRequest, res: Express.ExpressResponse, next: Express.NextFunction): void {
    if (req.originalUrl === '/api/v1/status') {
      return next()
    }
    const userId = req.header(HttpHeaders.UserId)
    const ownerId = req.header(HttpHeaders.OwnerId)
    const requestId = req.header(HttpHeaders.RequestId) || uuid()
    req.requestInfo = {
      userId,
      ownerId,
      requestId
    }
    this.logger.log(
      `Request ${req.method} ${req.originalUrl} userId ${userId}, ownerId ${ownerId}, with rid ${requestId}`
    )

    next()
  }
}
