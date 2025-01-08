<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})

const { t, locale } = useI18n()
const { PAGES } = usePages()
const { seoMetaInputByPageConfig } = useAppSeoMeta()

useSeoMeta(seoMetaInputByPageConfig(PAGES.LOGIN))

const { loginWithPassword } = useFirebaseAuth()
const { getLoginProviders } = useAuthProviders()
const { notifyByError, showWarningToaster } = useNotifyUser()
const { email, password, getSchema } = useFormFieldsYup()

const loading = ref(false)
const providers = computed(() => {
  // locale check is for a workaround if locale is changed
  return locale && getLoginProviders()
})

const fields = computed(() => {
  // locale check is for a workaround if locale is changed
  return locale && [email, password].map(field => ({ ...field, label: t(field.label), placeholder: t(field.placeholder) }))
})
const schema = computed(() => getSchema(fields.value))

const handleLogin = async (data: any) => {
  loading.value = true
  await loginWithPassword(data.email, data.password)
    .then((userCredentials) => {
      if (!userCredentials?.user?.emailVerified) {
        showWarningToaster({ key: 'notification.emailNotVerified' })
      }
    })
    .catch(notifyByError)
    .finally(() => loading.value = false)
}
</script>

<template>
  <UContainer class="flex items-center justify-center mt-5 md:mt-10">
    <client-only>
      <UAuthForm
        :title="t(PAGES.LOGIN.title.key, PAGES.LOGIN.title.params)"
        align="bottom"
        icon="i-heroicons-user-circle"
        :fields="fields"
        :providers="providers"
        :schema="schema"
        :loading="loading"
        :submit-button="{ label: t('common.Login') }"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="handleLogin"
      >
        <template #password-hint>
          <NuxtLink to="/auth/forgot-password" class="text-primary font-medium">{{ t('common.ForgotPassword') }}?
          </NuxtLink>
        </template>
        
        <template #footer>
          {{ t('page.login.notRegistered') }}
          <NuxtLink :to="PAGES.REGISTER.path" class="text-primary font-medium">
            {{ t(PAGES.REGISTER.title.key, PAGES.REGISTER.title.params) }}
          </NuxtLink>
        </template>
      </UAuthForm>
    </client-only>
  </UContainer>
</template>
