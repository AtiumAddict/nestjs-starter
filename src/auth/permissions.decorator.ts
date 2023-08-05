import { SetMetadata } from '@nestjs/common'
import { Permission } from './auth.enums'

export const PERMISSIONS_METADATA = 'permissions'

export const PermissionDecorator = (permissions: Permission[]) => SetMetadata(PERMISSIONS_METADATA, permissions)
