export enum NodeEnv {
  Production = 'production',
  Staging = 'staging',
  Development = 'development',
  Test = 'test',
  Localhost = 'localhost'
}

export enum NestProvider {
  DATABASE_CONNECTION = 'DATABASE_CONNECTION'
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum HttpHeaders {
  UserId = 'x-user-id',
  OwnerId = 'x-owner-id',
  Permissions = 'x-permissions',
  RequestId = 'x-request-id',
  AcceptLanguage = 'accept-language',
  TimeZone = 'x-time-zone',
  ContentType = 'content-type',
  Authorization = 'authorization',
  LastModified = 'last-Modified',
  ContentDisposition = 'content-disposition'
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  EXPECTATION_FAILED = 417,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  EXTERNAL_ERROR = 432,
  INTERNAL_ERROR = 500
}

export enum HttpContentType {
  APPLICATION_JSON = 'application/json',
  TEXT_HTML = 'text/html',
  TEXT_CSV = 'text/csv',
  MULTIPART_FORM_DATA = 'multipart/form-data',
  OCTET_STREAM = 'application/octet-stream'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}
