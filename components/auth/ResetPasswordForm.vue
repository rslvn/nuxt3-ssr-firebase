<script setup lang="ts">
import {PAGES} from '~/types'

const props = defineProps({
  oobCode: {
    type: String,
    required: false,
    default: ''
  },
})
const {notifyByError, closeAlert, alertMessage, showErrorAlert, showSuccessAlert} = useNotifyUser()
const {t} = useI18n()
const {resetPassword} = useFirebaseAuth()
const {password, confirmPassword, getSchema} = useFormFields()
const loading = ref(false)
if (!props.oobCode) {
  showErrorAlert({key: 'notification.invalidVerificationCode'})
}

const fields = computed(() => [password.value, confirmPassword.value])
const schema = computed(() => getSchema(fields.value))

const handleResetPassword = async (data: any) => {
  loading.value = true
  await resetPassword(props.oobCode, data.password)
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
            :submit-button="{  label: t('common.ResetPassword')}"
            :ui="{ base: 'text-center', footer: 'text-center' }"
            @submit="handleResetPassword"
        >
          <template #footer>
            {{ t('page.auth.rememberedPassword') }}
            <NuxtLink :to="PAGES.LOGIN.path" class="text-primary font-medium">
              {{ t(PAGES.LOGIN.title.key, PAGES.LOGIN.title.params) }}
            </NuxtLink>
          </template>
        </UAuthForm>
      </client-only>
    </section>
    <section v-if="alertMessage" class="mt-5">
      <AppAlert :alert-message="alertMessage" :close-alert="() => closeAlert"/>
    </section>
  </UContainer>
</template>