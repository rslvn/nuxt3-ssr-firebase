<script setup lang="ts">
import {PAGES} from "~/types";
import {confirmPasswordReset, verifyPasswordResetCode} from "firebase/auth";

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})

const {t} = useI18n()
const firebaseAuth = useFirebaseAuth()
const {notifyByError, closeAlert, alertMessage,showErrorAlert, showSuccessAlert} = useNotifyUser()
const {password, confirmPassword, getSchema} = useFormFields()
const route = useRoute();
const loading = ref(false)

const oobCode = route.query.oobCode as string
if(!oobCode){
  showErrorAlert({key: 'notification.invalidVerificationCode'})
}

const fields = [password, confirmPassword]
const schema = getSchema(fields)

const handleResetPassword = async (data: any) => {
  loading.value = true
  await verifyPasswordResetCode(firebaseAuth, oobCode)
      .then(async () => {
        await confirmPasswordReset(firebaseAuth, oobCode, data.password)
      })
      .then(() => {
        showSuccessAlert({key: 'notification.passwordUpdated'})
      })
      .catch(notifyByError)
      .finally(() => loading.value = false)
}
</script>

<template>
  <UContainer class="max-w-4xl mt-5 md:mt-10">

    <section v-if="oobCode" class="flex justify-center items-center">
      <client-only>
        <UAuthForm
            :title="t(PAGES.RESET_PASSWORD.title.key, PAGES.RESET_PASSWORD.title.params)"
            :description="t(PAGES.RESET_PASSWORD.description.key, PAGES.RESET_PASSWORD.description.params)"
            align="bottom"
            icon="i-heroicons-user-circle"
            :fields="fields"
            :schema="schema"
            :loading="loading"
            @submit="handleResetPassword"
            :submit-button="{  label: t('common.ResetPassword')}"
            :ui="{ base: 'text-center', footer: 'text-center' }"
        >
          <template #footer>
            {{ t('page.auth.rememberedPassword') }}
            <NuxtLink :to="PAGES.LOGIN.path" class="text-primary font-medium">{{ t(PAGES.LOGIN.title.key, PAGES.LOGIN.title.params) }}</NuxtLink>
          </template>
        </UAuthForm>
      </client-only>
    </section>
    <section v-if="alertMessage" class="mt-5">
      <AppAlert :alert-message="alertMessage" :close-alert="closeAlert"/>
    </section>
  </UContainer>
</template>