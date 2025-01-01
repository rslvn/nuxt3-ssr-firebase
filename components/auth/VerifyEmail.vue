<script setup lang="ts">
import { NotificationTarget } from '~/types'

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

const verifying = ref(true)

onMounted(() => {
  if (!props.oobCode) {
    verifying.value = false
    showErrorAlert({key: 'notification.invalidVerificationCode'})
    return
  }
  verifyEmail(props.oobCode)
    .then(() => {
      showSuccessAlert({key: 'notification.emailVerified'})
    })
    .catch(reason => notifyByError(reason, {target: NotificationTarget.ALERT}))
    .finally(() => verifying.value = false)
})
</script>

<template>
  <section v-if="verifying" class="mt-5 text-center">
    <USkeleton class="h-20" />
    <span>{{ t('common.processing') }}</span>
  </section>
  <section v-if="alertMessage" class="mt-5">
    <AppAlert :alert-message="alertMessage" :close-alert="() => closeAlert" />
  </section>
</template>
