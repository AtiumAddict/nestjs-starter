declare namespace ApiRequest {
  type RequestInfo = {
    userId: string
    ownerId: string
    requestId: string
    timeZone?: string
  }
}

interface AuthenticatedExpressRequest extends Express.ExpressRequest {
  requestInfo: ApiRequest.RequestInfo
}

interface ErrorCode {
  status?: number
  code: string
  userMessage: string
  userTitle: string
  technicalDescription?: string
  params?: Record<string, unknown>
}

type StringNumberOrArray = string | number | string[] | number[]

type IdQuery = {
  _id: Record<string, unknown>
}
