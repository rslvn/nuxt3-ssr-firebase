<script setup lang="ts">
import {applyActionCode} from "firebase/auth";
import {NotificationTarget} from "~/types";

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})

const route = useRoute();
const firebaseAuth = useFirebaseAuth()
const {notifyByError, closeAlert, alertMessage, showErrorAlert, showSuccessAlert} = useNotifyUser()

const verified = ref(false)

const oobCode = route.query.oobCode as string
if (!oobCode) {
  showErrorAlert({key: 'notification.invalidVerificationCode'})
}

onMounted(() => {
  if (!oobCode) {
    verified.value = true
    return
  }
  applyActionCode(firebaseAuth, oobCode)
      .then(() => {
        showSuccessAlert({key: 'notification.emailVerified'})
      })
      .catch(reason => notifyByError(reason, {target: NotificationTarget.ALERT}))
      .finally(() => verified.value = true)
})
</script>

<template>
  <UContainer>
    <section v-if="!verified" class="mt-5 text-center">
      <USkeleton class="h-20"/>
      <span>{{ t('common.processing') }}</span>
    </section>
    <section v-if="alertMessage" class="mt-5">
      <AppAlert :alert-message="alertMessage" :close-alert="closeAlert"/>
    </section>
  </UContainer>
</template>
