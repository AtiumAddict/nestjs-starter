import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston'
import { format, transports } from 'winston'
import { ClsServiceManager } from 'nestjs-cls'
import { LoggerService } from '@nestjs/common'
import { NodeEnv } from '../common.enums'

const addRequestId = format((info) => {
  const cls = ClsServiceManager.getClsService()
  const rid = cls.get('requestId')
  if (rid) info.rid = rid
  return info
})

export function createLogger(): LoggerService {
  return WinstonModule.createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          addRequestId(),
          format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike('Pluggy', {
            prettyPrint: process.env.NODE_ENV === NodeEnv.Localhost,
            colors: true
          })
        )
      })
    ]
  })
}
