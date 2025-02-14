<script setup lang="ts">
const { t } = useI18n()
const { PAGES } = usePages()
const { sendResetPasswordMail } = useFirebaseAuth()
const { notifyByError, alertMessage, closeAlert, showSuccessAlert } = useNotifyUser()
const { email, getSchema } = useFormSchema()
const loading = ref(false)

const fields = [email]
const schema = getSchema(fields)

const handleForgotPassword = async (data: any) => {
  loading.value = true
  await sendResetPasswordMail(data.email)
    .then(() => {
      showSuccessAlert({ key: 'notification.resetPasswordMailSent' })
    })
    .catch(notifyByError)
    .finally(() => loading.value = false)
}
</script>

<template>
  <div>
    <section class="flex justify-center items-center">
      <UAuthForm
        :title="t(PAGES.FORGOT_PASSWORD.title.key, PAGES.FORGOT_PASSWORD.title.params)"
        :description="t(PAGES.FORGOT_PASSWORD.description.key, PAGES.FORGOT_PASSWORD.description.params)"
        align="bottom"
        icon="i-heroicons-user-circle"
        :fields="fields"
        :schema="schema"
        :loading="loading"
        :submit-button="{ label: t('common.ResetPassword') }"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="handleForgotPassword"
      >
        <template #footer>
          {{ t('page.auth.rememberedPassword') }}
          <NuxtLink :to="PAGES.LOGIN.path" class="text-primary font-medium">
            {{ t(PAGES.LOGIN.title.key, PAGES.LOGIN.title.params) }}
          </NuxtLink>
        </template>
      </UAuthForm>
    </section>

    <section v-if="alertMessage" class="mt-5">
      <AppAlert :alert-message="alertMessage" :close-alert="() => closeAlert" />
    </section>
  </div>
</template>
