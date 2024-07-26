<script setup lang="ts">
import {UserProfile} from '~/types'

defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()

const {t} = useI18n()
const {showSuccessToaster, notifyByError} = useNotifyUser()
const authStore = useAuthStore()
const {sendEmailVerificationMail} = useFirebaseAuth()

const loading = ref(false)

const sendVerificationLink = () => {
  loading.value = true
  sendEmailVerificationMail()
    .then(() => {
      showSuccessToaster({key: 'notification.verificationMailSent'})
    })
    .catch(notifyByError)
    .finally(() => loading.value = false)
}

</script>

<template>
  <UDashboardSection :title="t('field.emailAddress.label')" :description="t('field.emailAddress.description')">
    <template #links>
      <span>{{ userProfile?.email }}</span>

      <template v-if="isMyProfile && authStore.authUser">
        <UIcon v-if="authStore.authUser?.emailVerified" name="i-heroicons-check-circle-solid"
               class="text-green-700 h-7 w-7"
               dynamic/>
        <UButton
            v-else
            color="orange"
            square
            variant="ghost"
            class="hover:bg-gray-50 dark:hover:bg-gray-800"
            icon="heroicons:exclamation-triangle-20-solid"
            :loading="loading"
            @click="sendVerificationLink"
        >
          {{ t('common.Verify') }}
        </UButton>
      </template>
    </template>
  </UDashboardSection>
</template>