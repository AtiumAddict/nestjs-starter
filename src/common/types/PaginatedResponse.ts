import { ApiProperty } from '@nestjs/swagger'

export class PaginatedResponse<T> {
  @ApiProperty({ description: 'The page size.' })
  pageSize?: number

  @ApiProperty({ description: 'The page number.' })
  pageNumber?: number

  @ApiProperty({ description: 'The total number of results in all pages.' })
  totalCount?: number

  @ApiProperty({ description: 'The total number of pages.' })
  totalPages?: number

  data: T[]
}
