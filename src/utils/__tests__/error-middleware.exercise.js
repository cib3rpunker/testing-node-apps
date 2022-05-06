// Testing Middleware

import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

// 🐨 Write a test for the UnauthorizedError case
test('responds with 401 for express-jwt UnauthorizedError', () => {
  const code = 'some_error_code'
  const message = 'Some message'
  const req = {}
  const next = jest.fn()
  const error = new UnauthorizedError(code, {message})
  const res = {json: jest.fn(() => res), status: jest.fn(() => res)}

  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({code: error.code, message: error.message})
  expect(res.json).toHaveBeenCalledTimes(1)
})

// 🐨 Write a test for the headersSent case
test('calls next if headersSent is true', () => {
  const req = {}
  const next = jest.fn()
  const error = new Error('Some message')
  const res = {json: jest.fn(() => res), status: jest.fn(() => res), headersSent: true}

  errorMiddleware(error, req, res, next)
  expect(next).toHaveBeenCalledWith(error)
  expect(next).toHaveBeenCalledTimes(1)
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).not.toHaveBeenCalled()
})

// 🐨 Write a test for the else case (responds with a 500)
