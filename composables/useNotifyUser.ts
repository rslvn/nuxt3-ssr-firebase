import {
    ERROR_TRANSLATIONS,
    NOTIFICATION_TYPES,
    NotificationMessage,
    NotificationMessageOptions,
    NotificationTarget,
    NotificationTypeConfig,
    TranslationConfig
} from "~/types";
import {v4 as uuidv4} from 'uuid';

export default function () {
    const toast = useToast()
    const {t} = useI18n()
    const alertMessage = ref(null as NotificationMessage)

    const closeAlert = () => {
        alertMessage.value = null;
    }

    const showAlert = (type: NotificationTypeConfig, message: TranslationConfig, title?: TranslationConfig) => {
        alertMessage.value = {id: uuidv4(), type, message, title: title || type.title}
    }

    const showSuccessAlert = (message: TranslationConfig, title?: TranslationConfig) => {
        showAlert(NOTIFICATION_TYPES.SUCCESS, message, title)
    }

    const showErrorAlert = (message: TranslationConfig, title?: TranslationConfig) => {
        showAlert(NOTIFICATION_TYPES.ERROR, message, title)
    }

    const showWarningAlert = (message: TranslationConfig, title?: TranslationConfig) => {
        showAlert(NOTIFICATION_TYPES.WARNING, message, title)
    }

    const showInfoAlert = (message: TranslationConfig, title?: TranslationConfig) => {
        showAlert(NOTIFICATION_TYPES.INFO, message, title)
    }

    const showToaster = (type: NotificationTypeConfig, message: TranslationConfig, title?: TranslationConfig) => {
        const titleNotification = title || type.title
        toast.add({
            title: t(titleNotification.key, titleNotification.params),
            description: t(message.key, message.params),
            icon: type.icon,
            color: type.color as any,
            closeButton: {icon: ''},
        })
    }
    const showSuccessToaster = (message: TranslationConfig, title?: TranslationConfig) => {
        showToaster(NOTIFICATION_TYPES.SUCCESS, message, title)
    }

    const showErrorToaster = (message: TranslationConfig, title?: TranslationConfig) => {
        showToaster(NOTIFICATION_TYPES.ERROR, message, title)
    }

    const showWarningToaster = (message: TranslationConfig, title?: TranslationConfig) => {
        showToaster(NOTIFICATION_TYPES.WARNING, message, title)
    }

    const showInfoToaster = (message: TranslationConfig, title?: TranslationConfig) => {
        showToaster(NOTIFICATION_TYPES.INFO, message, title)
    }

    const sendNotification = (options?: NotificationMessageOptions) => {
        const type = options?.type || NOTIFICATION_TYPES.ERROR
        const title = options?.title || type.title
        const message = options?.message || {key: 'notification.systemError'}
        console.log('>>>> sendNotification:', type, title, message)

        if (options?.target === NotificationTarget.ALERT) {
            showAlert(type, message, title)
        } else {
            showToaster(type, message, title)
        }
    }

    const notifyByError = (error: any, options?: NotificationMessageOptions) => {
        console.log('>>>>> notifyByError: ', error)
        if (error?.code) {
            const notificationMessageOptions: NotificationMessageOptions = options || {}
            sendNotification({...notificationMessageOptions, message: ERROR_TRANSLATIONS[error.code]})
        } else {
            sendNotification()
        }
    }

    return {
        alertMessage,
        closeAlert,
        showSuccessAlert,
        showErrorAlert,
        showWarningAlert,
        showInfoAlert,
        showSuccessToaster,
        showErrorToaster,
        showWarningToaster,
        showInfoToaster,
        sendNotification,
        notifyByError
    }
}