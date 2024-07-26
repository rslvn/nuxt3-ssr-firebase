<script setup lang="ts">
import {NotificationTarget} from '~/types'

const props = defineProps({
  oobCode: {
    type: String,
    required: false,
    default: ''
  },
})
const {t} = useI18n()
const {verifyEmail} = useFirebaseAuth()
const {notifyByError, closeAlert, alertMessage, showErrorAlert, showSuccessAlert} = useNotifyUser()

const verified = ref(false)

onMounted(() => {
  if (!props.oobCode) {
    verified.value = true
    showErrorAlert({key: 'notification.invalidVerificationCode'})
    return
  }
  verifyEmail(props.oobCode)
    .then(() => {
      showSuccessAlert({key: 'notification.emailVerified'})
    })
    .catch(reason => notifyByError(reason, {target: NotificationTarget.ALERT}))
    .finally(() => verified.value = true)
})
</script>

<template>
  <section v-if="!verified" class="mt-5 text-center">
    <USkeleton class="h-20"/>
    <span>{{ t('common.processing') }}</span>
  </section>
  <section v-if="alertMessage" class="mt-5">
    <AppAlert :alert-message="alertMessage" :close-alert="() => closeAlert"/>
  </section>
</template>
