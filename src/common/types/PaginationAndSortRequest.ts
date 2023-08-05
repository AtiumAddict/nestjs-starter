import { IsInt, IsOptional, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { SortRequest } from './SortRequest'

export class PaginationAndSortRequest extends SortRequest {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'The size of the returned page.', required: false })
  pageSize?: number = 25

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @ApiProperty({ description: 'The page number.', required: false })
  pageNumber?: number = 0
}
