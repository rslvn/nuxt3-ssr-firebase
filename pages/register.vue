<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})

const { PAGES } = usePages()
const { seoMetaInputByPageConfig } = useAppSeoMeta()
useSeoMeta(seoMetaInputByPageConfig(PAGES.REGISTER))

const { t, locale } = useI18n()
const { registerWithPassword } = useFirebaseAuth()
const { notifyByError, showSuccessToaster } = useNotifyUser()
const { email, password, confirmPassword, getSchema } = useFormFieldsYup()
const { getRegisterProviders } = useAuthProviders()
const loading = ref(false)
const providers = computed(() => {
  // locale check is for a workaround if locale is changed
  return locale && getRegisterProviders()
})

const fields = computed(() => {
  // locale check is for a workaround if locale is changed
  return locale && [email, password, confirmPassword].map(field => ({ ...field, label: t(field.label), placeholder: t(field.placeholder) }))
})
const schema = computed(() => getSchema(fields.value))

const handleRegister = async (data: any) => {
  loading.value = true
  await registerWithPassword(data.email, data.password)
    .then(() => {
      showSuccessToaster({ key: 'notification.verificationMailSent' })
    })
    .catch(notifyByError)
    .finally(() => loading.value = false)
}
</script>

<template>
  <UContainer class="max-w-4xl mt-5 md:mt-10">
    <section class="flex justify-center items-center">
      <client-only>
        <UAuthForm
          :title="t(PAGES.REGISTER.title.key, PAGES.REGISTER.title.params)"
          align="bottom"
          icon="i-heroicons-user-circle"
          :fields="fields"
          :providers="providers"
          :schema="schema"
          :loading="loading"
          :submit-button="{ label: t('common.Register') }"
          :ui="{ base: 'text-center', footer: 'text-center' }"
          @submit="handleRegister"
        >
          <template #footer>
            {{ t('page.register.alreadyRegistered') }}
            <NuxtLink :to="PAGES.LOGIN.path" class="text-primary font-medium">
              {{ t(PAGES.LOGIN.title.key, PAGES.LOGIN.title.params) }}
            </NuxtLink>
          </template>
        </UAuthForm>
      </client-only>
    </section>
  </UContainer>
</template>
