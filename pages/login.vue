<script setup lang="ts">
import {PAGES} from "~/types";
import {computed} from "vue";

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})

const {t, locale} = useI18n()
const {seoMetaInputByPageConfig} = useAppSeoMeta()

useSeoMeta(seoMetaInputByPageConfig(PAGES.LOGIN))

const {loginWithPassword} = useFirebaseAuth();
const {notifyByError, showWarningToaster} = useNotifyUser()
const {email, password, getSchema} = useFormFields()

const loading = ref(false)
const providers = computed(() => {
      return locale
          ? [
            {
              label: t('page.login.provider', {provider: 'Google'}),
              icon: 'i-simple-icons-google',
              color: 'red' as const,
              click: () => googleLogin
            },
            {
              label: t('page.login.provider', {provider: 'Facebook'}),
              icon: 'i-simple-icons-facebook',
              color: 'blue' as const,
              click: () => facebookLogin
            },
            {
              label: t('page.login.provider', {provider: 'Twitter'}),
              icon: 'i-simple-icons-twitter',
              color: 'sky' as const,
              click: () => twitterLogin
            }
          ]
          : null
    }
)
const facebookLogin = () => {
}
const twitterLogin = () => {
}
const googleLogin = () => {
}

const fields = computed(() => [email.value, password.value])
const schema = computed(() => getSchema(fields.value))

const handleLogin = async (data: any) => {
  loading.value = true
  await loginWithPassword(data.email, data.password)
      .then((userCredentials) => {
        if (!userCredentials?.user?.emailVerified) {
          showWarningToaster({key: 'notification.emailNotVerified'})
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
          @submit="handleLogin"
          :submit-button="{  label: t('common.Login')}"
          :ui="{ base: 'text-center', footer: 'text-center' }"
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