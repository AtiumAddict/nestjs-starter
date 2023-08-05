import { IsEnum, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { DEFAULT_SORT_FIELD } from '../common.constants'
import { SortDirection } from '../common.enums'
import { ApiProperty } from '@nestjs/swagger'

export class SortRequest {
  @IsOptional()
  @IsEnum(SortDirection)
  @ApiProperty({ description: 'The sort direction.', enum: SortDirection, required: false })
  sortDirection?: SortDirection = SortDirection.DESC

  @IsOptional()
  @Type(() => String)
  @ApiProperty({
    description: 'The field with which to sort.',
    enum: SortDirection,
    required: false,
    default: DEFAULT_SORT_FIELD
  })
  sortField?: string = DEFAULT_SORT_FIELD
}
