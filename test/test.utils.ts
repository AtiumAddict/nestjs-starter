import { INestApplication, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common'
import { RequestMiddleware } from '../src/common/middlewares/request.middleware'

export async function initializeTestApp(app: INestApplication): Promise<void> {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  await app.init()
}

@Module({})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestMiddleware).forRoutes('*')
  }
}
