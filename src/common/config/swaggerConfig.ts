import * as fs from 'fs'
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export async function setupOpenAPI(app: INestApplication): Promise<void> {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Pluggy')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('nestjs-sample')
    .build()
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  }
  const document = SwaggerModule.createDocument(app, documentBuilder, options)
  fs.writeFileSync('src/api/specification.json', JSON.stringify(document))
  // SwaggerModule.setup('api', app, document) TODO Add authentication to reinstate it.
}
