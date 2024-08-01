import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    environment: 'nuxt',
    css: true,
    coverage: {
      provider: 'v8', // or 'istanbul',
      reporter: ['html'],
    },
  }
})
