import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { setupOpenAPI } from './common/config/swaggerConfig'
import { NodeEnv } from './common/common.enums'
import { ValidationExceptionFilter } from './common/exceptions/ValidationException'
import { AuthenticationExceptionFilter } from './common/exceptions/AuthenticationException'
import { ResourceNotFoundExceptionFilter } from './common/exceptions/ResourceNotFoundException'
import { UnhandledExceptionFilter } from './common/exceptions/filters/UnhandledExceptionFilter'
import { cors } from './common/middlewares/cors'
import { createLogger } from './common/config/logger'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: createLogger()
  })
  app.setGlobalPrefix('api')
  app.enableCors(cors)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalFilters(
    new UnhandledExceptionFilter(),
    new AuthenticationExceptionFilter(),
    new ValidationExceptionFilter(),
    new ResourceNotFoundExceptionFilter()
  )

  if (process.env.NODE_ENV !== NodeEnv.Production) {
    await setupOpenAPI(app)
  }

  const server = await app.listen(process.env.PORT || 8060)
  server.setTimeout(15000)
}
bootstrap()
