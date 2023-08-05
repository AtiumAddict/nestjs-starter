import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD, ModuleRef, Reflector } from '@nestjs/core'
import { ClsModule } from 'nestjs-cls'
import { ConfigModule } from './common/config/app-config/config.module'
import { ConfigService } from './common/config/app-config/config.service'
import { AppController } from './app.controller'
import { RequestMiddleware } from './common/middlewares/request.middleware'
import { HttpHeaders } from './common/common.enums'
import { AuthGuard } from './auth/auth.guard'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls, req: Request) => {
          cls.set('userId', req.headers[HttpHeaders.UserId])
          cls.set('requestId', req.headers[HttpHeaders.RequestId])
          cls.set('ownerId', req.headers[HttpHeaders.OwnerId])
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: async (moduleRef: ModuleRef) => {
        const reflector = moduleRef.get(Reflector)
        const configService = moduleRef.get(ConfigService)
        return new AuthGuard(reflector, configService)
      },
      inject: [ModuleRef]
    },
    Reflector,
    ConfigService,
    Logger
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestMiddleware).forRoutes('*')
  }
}
