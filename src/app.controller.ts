import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

@Controller('v1')
export class AppController {
  @Get('/status')
  @ApiOkResponse()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getStatus(): void {}
}
