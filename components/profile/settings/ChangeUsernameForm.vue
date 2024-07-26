<script setup lang="ts">
import {PAGES, UserProfile} from '~/types'
import {sanitizeUrlContext} from '~/service/url-service'

const props = defineProps<{
  userProfile: UserProfile
}>()

const {username, getSchema} = useFormFields()
const {getUserProfile, saveUserProfile} = useUserProfileCollection()
const {notifyByError, showSuccessToaster} = useNotifyUser()
const {reloadUserProfile} = useAppGlobals()
const requestURL = useRequestURL()

const {t} = useI18n()
const showConfirmModal = ref(false)
const state = reactive({
  username: props.userProfile?.username || ''
})
const fields = computed(() => [username.value])
const schema = computed(() => getSchema(fields.value))

const updateUsername = () => {
  return getUserProfile(props.userProfile.id)
    .then(async (profile) => {
      profile.username = state.username.trim()
      return await saveUserProfile(profile)
    })
    .then((profile) => {
      if (profile) {
        reloadUserProfile()
        showSuccessToaster({key: 'notification.profileUsernameUpdated'})
        navigateTo(`${PAGES.PROFILE.path}/${profile.username}`, {replace: true})
      }
    })
    .catch(notifyByError)
}

const source = ref(requestURL.href)
const {copy, copied} = useClipboard({source})

const copyClipboard = () => {
  copy(source.value)
  showSuccessToaster({key: 'notification.profileUrlCopied'})
}

const copyProfileUrlDisabled = computed(() => {
  return copied.value || (props.userProfile?.username !== state.username)
})

const sanitizeUsername = () => {
  state.username = sanitizeUrlContext(state.username)
}

</script>

<template>
  <UForm :state="state" :schema="schema" @submit="showConfirmModal = true">
    <UDashboardSection :title="t('button.ChangeUsername')">
      <UFormGroup :label="username.label" :name="username.name" :description="username.description"
                  :required="username.required" eager-validation
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center"
                  :ui="{ container: ''}">
        <UInput v-model="state.username" :type="username.type" :placeholder="username.placeholder"
                :required="username.required"
                @keyup="sanitizeUsername"/>
      </UFormGroup>

      <template #links>
        <UButton
          :icon="copied ? 'i-heroicons-check-20-solid' : 'i-heroicons-clipboard-20-solid'"
          :color="copied ? 'green': 'primary'"
          variant="ghost"
          :disabled="copyProfileUrlDisabled"
          @click="copyClipboard()"
        >
          {{ t('button.CopyProfileUrl') }}
        </UButton>
      </template>

    </UDashboardSection>

    <UDashboardSection>
      <template #links>
        <UButton type="submit" :label="t('button.ChangeUsername')" :loading="showConfirmModal"
                 :disabled="showConfirmModal"/>
      </template>
    </UDashboardSection>
    <ConfirmDialogModal v-model="showConfirmModal"
                        :title="t('dialog.changeUsername.title')"
                        :description="t('dialog.changeUsername.description')"
                        :on-confirm="updateUsername"
                        :confirm-button-label="t('button.ChangeUsername')"/>
  </UForm>
</template>