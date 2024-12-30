import { expect, test } from 'vitest'
import { sanitizeUrlContext } from '~/service/url-service'

test('sanitizeUrlContext', async () => {
  const urlContext = sanitizeUrlContext('HeLLo*+~.,?#=()\'"!:@_ wOrLd')
  expect(urlContext).toBe('hello-world')
})
