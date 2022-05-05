// Testing Pure Functions
import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'

cases(
  'isPasswordAllowed: valid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(true)
  },
  {
    'valid password': {
      password: '!aBc123',
    },
  },
)

cases(
  'isPasswordAllowed: invalid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(false)
  },
  {
    'too short': {
      password: 'A2c!',
    },
    'no alphabet characters || no letters': {
      password: '123456!',
    },
    'no numbers': {
      password: 'ABCdef!',
    },
    'no uppercase letters': {
      password: 'abc123!',
    },
    'no lowercase letters': {
      password: 'ABC123!',
    },
    'no special characters || no non-alphanumeric characters': {
      password: 'ABCdef123',
    },
  },
)

// describe('isPasswordAllowed only allows some passwords', () => {
//   const allowedPasswords = ['!aBc123']
//   const disallowedPasswords = [
//   ]

//   allowedPasswords.forEach((password) => {
//     test(`allows ${password}`, () => {
//       expect(isPasswordAllowed(password)).toBe(true)
//     })
//   })

//   disallowedPasswords.forEach((password) => {
//     test(`disallows ${password}`, () => {
//       expect(isPasswordAllowed(password)).toBe(false)
//     })
//   })
// })
