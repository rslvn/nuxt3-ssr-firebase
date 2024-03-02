<script setup lang="ts">
import {applyActionCode} from "firebase/auth";
import {NotificationTarget} from "~/types";

const props = defineProps({
  oobCode: {
    type: String,
    required: false,
    default: ''
  },
})
const {t} = useI18n()
const firebaseAuth = useFirebaseAuth()
const {notifyByError, closeAlert, alertMessage, showErrorAlert, showSuccessAlert} = useNotifyUser()

const verified = ref(false)

if (!props.oobCode) {
  // throw error
  showErrorAlert({key: 'notification.invalidVerificationCode'})
}

onMounted(() => {
  if (!props.oobCode) {
    verified.value = true
    return
  }
  applyActionCode(firebaseAuth, props.oobCode)
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
    <AppAlert :alert-message="alertMessage" :close-alert="closeAlert"/>
  </section>
</template>
