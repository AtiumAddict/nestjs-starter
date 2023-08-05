import { HttpStatus } from '../common.enums'

export const Generic = 'GEN'
export const Auth = 'AUTH'
export const Customer = 'CUSTOMER'
export const CustomerEvent = 'CUSTOMER_EVENT'
export const Validation = 'VALIDATION'

export default {
  GENERIC__ERROR: {
    code: `${Generic}0001`,
    userTitle: 'Something went wrong',
    userMessage: 'Something went wrong! Please try again later.',
    technicalDescription: 'An error occurred which is not mapped. This generic error is shown in that case.'
  },
  VALIDATION__ERROR: {
    code: `${Validation}0001`,
    userTitle: 'Insufficient localised error codes.',
    userMessage: 'Please add up the missing localised error codes.',
    technicalDescription: 'Some of the error codes are missing from the localised error codes files.'
  },
  GENERIC__ERROR_IMPLEMENTATION_MISSING: {
    code: `${Generic}0002`,
    userTitle: 'Something went wrong',
    userMessage: 'Something went wrong! Please try again later.',
    technicalDescription: 'A technical error occurred which is not mapped.'
  },
  GENERIC__THROTTLING_ERROR: {
    code: `${Generic}0003`,
    userTitle: 'Something went wrong',
    userMessage: 'Something went wrong! Please try again later.',
    technicalDescription: 'Too many requests.'
  },
  GENERIC__RESOURCE_NOT_FOUND: {
    code: `${Generic}0004`,
    userTitle: 'Resource not found',
    userMessage: 'Resource not found',
    statusCode: HttpStatus.NOT_FOUND
  },
  AUTH__UNAUTHORIZED: {
    code: `${Auth}0001`,
    userTitle: 'Access Denied',
    userMessage: 'Access denied!',
    technicalDescription: 'Access denied. Request is not authenticated.'
  }
}
