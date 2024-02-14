export * from './notification-types'
export * from './page-types'

export interface ConfigType<T> {
    [key: string]: T
}

export interface TranslationConfig {
    key: string
    params?: string
}
