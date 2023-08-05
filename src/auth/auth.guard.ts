import { isEmpty } from 'lodash'
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { ConfigService } from '../common/config/app-config/config.service'
import { Permission } from './auth.enums'
import { PERMISSIONS_METADATA } from './permissions.decorator'
import AuthenticationException from '../common/exceptions/AuthenticationException'
import ErrorCodes from '../common/exceptions/errorCodes'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private configService: ConfigService) {}

  private readonly logger = new Logger(AuthGuard.name)

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    if (request.originalUrl === '/api/v1/status') {
      return true
    }
    const requiredPermissions = this.reflector.get<Permission[]>(PERMISSIONS_METADATA, context.getHandler())
    if (isEmpty(requiredPermissions)) {
      return true
    }
    const userPermissions = request.requestInfo?.permissions
    if (!this.userHasRequiredPermissions(requiredPermissions, userPermissions)) {
      this.logger.error({
        key: 'authorization',
        message: 'The user is not allowed to access the resource.',
        url: request.originalUrl,
        requestInfo: request.requestInfo,
        requiredPermissions
      })
      throw new AuthenticationException(ErrorCodes.AUTH__UNAUTHORIZED, { requiredPermissions })
    }
    return true
  }

  /**
   * Returns true, if every required permission is covered by the user permissions.
   * @param requiredPermissions {Permission[]} the required permissions to access the resource.
   * @param userPermissions {Permission[]} the user's permissions.
   */
  userHasRequiredPermissions(requiredPermissions: Permission[] = [], userPermissions: Permission[] = []): boolean {
    if (isEmpty(requiredPermissions)) {
      return true
    }
    if (isEmpty(userPermissions)) {
      return false
    }
    if (userPermissions.includes(Permission.Wildcard)) {
      return true
    }

    return requiredPermissions.every((permission) => userPermissions.includes(permission))
  }
}
