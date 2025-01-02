import {
  expect,
  test
} from 'vitest'
import { uuidv4 } from '@firebase/util'
import { removeDashes } from '~/service/text-service'

test('removeDashes > uuid without dashes', () => {
  const uuid = uuidv4()
  expect(uuid.includes('-')).true
  const uuidWithoutDashes = removeDashes(uuid)
  expect(uuidWithoutDashes.includes('-')).false
})
