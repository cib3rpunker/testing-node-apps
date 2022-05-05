// Testing Pure Functions

import {isPasswordAllowed} from '../auth'

describe('isPasswordAllowed only allows some passwords', () => {
  const allowedPasswords = ['!aBc123']
  const disallowedPasswords = [
    'a2c!', // too short
    '123456!', // no alphabet characters
    'ABCdef!', // no numbers
    'abc123!', // no uppercase letters
    'ABC123!', // no lowercase letters
    'ABCdef123', // no non-alphanumeric characters
  ]

  allowedPasswords.forEach(password => {
    test(`allows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(true)
    })
  })

  disallowedPasswords.forEach(password => {
    test(`disallows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(false)
    })
  })

});
