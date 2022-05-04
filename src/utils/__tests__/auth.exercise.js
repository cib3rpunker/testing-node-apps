// Testing Pure Functions

import {isPasswordAllowed} from '../auth'

//-  VALID:  !aBc123
test('isPasswordAllowed returns true for valid passwords', () => {
  expect(isPasswordAllowed('!aBc123')).toBe(true)
})

//-  INVALID:  a2c!
test('isPasswordAllowed returns FALSE for INVALID passwords', () => {
  expect(isPasswordAllowed('a2c!')).toBe(false) // too short
  expect(isPasswordAllowed('123456!')).toBe(false) // no alphabet characters
  expect(isPasswordAllowed('ABCdef!')).toBe(false) // no numbers
  expect(isPasswordAllowed('abc123!')).toBe(false) // no uppercase letters
  expect(isPasswordAllowed('ABC123!')).toBe(false) // no lowercase letters
  expect(isPasswordAllowed('ABCdef123')).toBe(false) // no non-alphanumeric characters
})
