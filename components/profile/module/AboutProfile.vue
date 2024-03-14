<script setup lang="ts">
import {UserProfile} from "~/types";
import {getDisplayName} from "~/service/user-profile-service";
import {sendEmailVerification} from "firebase/auth";
import {User} from "@firebase/auth";

const props = defineProps<{
  userProfile: UserProfile
  user: User
  isMyProfile?: boolean
}>()
const {t} = useI18n()
const {showSuccessToaster, notifyByError} = useNotifyUser()

const displayName = computed(() => {
  return getDisplayName(props.userProfile)
})
const loading = ref(false)

const sendVerificationLink = () => {
  if (!props.user) {
    return
  }
  loading.value = true
  sendEmailVerification(props.user)
      .then(() => {
        showSuccessToaster({key: 'notification.verificationMailSent'})
      })
      .catch(notifyByError)
      .finally(() => loading.value = false)
}
</script>

<template>
  <UContainer>
    <UDashboardPanelContent class="pb-24 ">

      <UDashboardSection :title="t('field.emailAddress.label')" :description="t('field.emailAddress.description')"
                         icon="i-heroicons-envelope"
                         :ui="{container: 'flex items-center justify-center sm:justify-between sm:flex-row gap-4', title: 'font-normal', icon:{base: 'w-8 h-8'}}">
        <template #links>
          <span>{{ userProfile?.email }}</span>

          <template v-if="isMyProfile && user">
            <UIcon v-if="user.emailVerified" name="i-heroicons-check-circle-solid" class="text-green-700 h-7 w-7"
                   dynamic></UIcon>
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
      <UDivider class="mb-4"/>
      <UDashboardSection :title="t('field.fullName.label')" :description="t('field.fullName.description')"
                         icon="i-heroicons-identification"
                         :ui="{container: 'flex items-center justify-center sm:justify-between sm:flex-row gap-4', title: 'font-normal', icon:{base: 'w-8 h-8'}}">
        <template #links>
          <span>{{ displayName }}</span>
        </template>
      </UDashboardSection>
      <UDivider class="mb-4"/>
    </UDashboardPanelContent>
  </UContainer>

</template>
