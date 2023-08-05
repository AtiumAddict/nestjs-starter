import { Injectable } from '@nestjs/common'
import * as Convict from 'convict'
import * as dotenv from 'dotenv'
import * as convictWithValidators from 'convict-format-with-validator'
import { Schema } from './config.schema'
import { Config } from './config'
import AppConfig = Config.AppConfig

@Injectable()
export class ConfigService {
  config: Convict.Config<Config.AppConfig>

  constructor() {
    Convict.addFormats(convictWithValidators)
    this.config = Convict(Schema)
    const dotEnvFile = dotenv.config().parsed
    if (dotEnvFile) {
      this.config.load(dotEnvFile)
    }
    // FIXME The load function also adds the key-value pairs from the .env file or env variables instead of only
    //  loading the values replacing the default ones in the config object. That means that a validation is triggered
    //  for undeclared properties. For example, the warning "configuration param 'NODE_ENV' not declared in the schema"
    //  is thrown, because the NODE_ENV is declared as mongodb.uri in the schema, which is based on the AppConfig type.
    this.config.validate({ allowed: 'warn' })
  }

  get(): AppConfig {
    return this.config.getProperties()
  }
}
