import { HttpHeaders, HttpMethod } from '../common.enums'

export const cors = {
  methods: Object.values(HttpMethod),
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Secret',
    'AppId',
    'buildversion',
    'App-Version',
    'App-Build-Number',
    ...Object.values(HttpHeaders)
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}
