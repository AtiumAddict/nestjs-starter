abstract class AbstractHttpException extends Error {
  status?: number
  message: string
  params?: string

  protected constructor(message: string, params?: string, status?: number) {
    super(message)
    Error.call(this) // super constructor
    Error.captureStackTrace(this, this.constructor)
    this.message = message
    this.params = params
    this.status = status
    Object.setPrototypeOf(this, AbstractHttpException.prototype)
  }
}

export default AbstractHttpException
