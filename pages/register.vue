<script setup lang="ts">
import {PAGES} from "~/types";
import {computed} from "vue";

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})

const {seoMetaInputByPageConfig} = useAppSeoMeta()
useSeoMeta(seoMetaInputByPageConfig(PAGES.REGISTER))

const {t, locale} = useI18n()
const {registerWithPassword} = useFirebaseAuth();
const {notifyByError, showSuccessToaster} = useNotifyUser()
const {email, password, confirmPassword, getSchema} = useFormFields()
const loading = ref(false)
const providers = computed(() => {
      return locale
          ? [
            {
              label: t('page.register.provider', {provider: 'Google'}),
              icon: 'i-simple-icons-google',
              color: 'red' as const,
              click: () => googleRegister
            },
            {
              label: t('page.register.provider', {provider: 'Facebook'}),
              icon: 'i-simple-icons-facebook',
              color: 'blue' as const,
              click: () => facebookRegister
            },
            {
              label: t('page.register.provider', {provider: 'Twitter'}),
              icon: 'i-simple-icons-twitter',
              color: 'sky' as const,
              click: () => twitterRegister
            }
          ]
          : null
    }
)

const fields = computed(() => [email.value, password.value, confirmPassword.value])
const schema = computed(() => getSchema(fields.value))

const facebookRegister = () => {
}
const twitterRegister = () => {
}
const googleRegister = () => {
}

const handleRegister = async (data: any) => {
  loading.value = true
  await registerWithPassword(data.email, data.password)
      .then(() => {
        showSuccessToaster({key: 'notification.verificationMailSent'})
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
            @submit="handleRegister"
            :submit-button="{  label: t('common.Register')}"
            :ui="{ base: 'text-center', footer: 'text-center' }"
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