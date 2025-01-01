export * from './notification-types'
export * from './firebase-types'

export interface TranslationConfig {
  key: string
  params?: any
}

export interface PageConfig {
  title: TranslationConfig
  description: TranslationConfig
  path: string
}
