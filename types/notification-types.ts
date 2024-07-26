import {TranslationConfig} from '~/types'

export enum NotificationTarget {
  ALERT,
  TOASTER
}

export interface NotificationTypeConfig {
  icon: string
  color: string
  title: TranslationConfig
}

export interface NotificationMessage {
  id: string
  type: NotificationTypeConfig
  title: TranslationConfig
  message: TranslationConfig
}

export interface NotificationMessageOptions {
  target?: NotificationTarget
  type?: NotificationTypeConfig
  title?: TranslationConfig
  message?: TranslationConfig
}

export const NOTIFICATION_TYPES = {
  SUCCESS: {
    icon: 'i-heroicons-check-circle',
    color: 'green',
    title: {key: 'common.Success'}
  } as NotificationTypeConfig,
  ERROR: {
    icon: 'i-heroicons-exclamation-circle',
    color: 'red',
    title: {key: 'common.Error'}
  } as NotificationTypeConfig,
  WARNING: {icon: 'i-heroicons-x-circle', color: 'amber', title: {key: 'common.Warning'}} as NotificationTypeConfig,
  INFO: {
    icon: 'i-heroicons-information-circle',
    color: 'indigo',
    title: {key: 'common.Info'}
  } as NotificationTypeConfig
}

export const ERROR_TRANSLATIONS: any = {
  'auth/invalid-credential': {key: 'notification.invalidCredentials'} as TranslationConfig,
  'auth/wrong-password': {key: 'notification.wrongPassword'} as TranslationConfig,
  'auth/expired-action-code': {key: 'notification.verificationCodeExpired'} as TranslationConfig,
  'auth/invalid-action-code': {key: 'notification.verificationCodeExpired'} as TranslationConfig,
  'auth/email-already-in-use': {key: 'notification.emailAlreadyInUse'} as TranslationConfig
}
