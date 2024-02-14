import {ConfigType, TranslationConfig} from "~/types";

export enum NotificationTarget {
    ALERT,
    TOASTER
}

export interface NotificationTypeConfig {
    icon: string,
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

export const NOTIFICATION_TYPES: ConfigType<NotificationTypeConfig> = {
    SUCCESS: {icon: 'i-heroicons-check-circle', color: 'green', title: {key: 'common.Success'}},
    ERROR: {icon: 'i-heroicons-exclamation-circle', color: 'red', title: {key: 'common.Error'}},
    WARNING: {icon: 'i-heroicons-x-circle', color: 'amber', title: {key: 'common.Warning'}},
    INFO: {icon: 'i-heroicons-information-circle', color: 'indigo', title: {key: 'common.Info'}}
}

export const ERROR_TRANSLATIONS: ConfigType<TranslationConfig> = {
    'auth/invalid-credential':  {key: 'notification.invalidCredentials'},
    'auth/wrong-password':  {key: 'notification.wrongPassword'},
    'auth/expired-action-code': {key: 'notification.verificationCodeExpired'},
    'auth/invalid-action-code': {key: 'notification.verificationCodeExpired'},
    'auth/email-already-in-use': {key: 'notification.emailAlreadyInUse'}
}
