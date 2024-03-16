<script setup lang="ts">
import {PAGES, ProvideInjectType, UserProfile} from "~/types";

const props = defineProps<{
  userProfile: UserProfile
}>()

const {updateUserProfile} = inject(ProvideInjectType.USER_PROFILE_UPDATED)

const {username, getSchema} = useFormFields()
const {getUserProfile, saveUserProfile} = useUserProfileCollection()
const {notifyByError, showSuccessToaster} = useNotifyUser()
const {t} = useI18n()

const loading = ref(false)
const state = reactive({
  username: props.userProfile?.username || ''
})
const fields = computed(() => [username.value])
const schema = computed(() => getSchema(fields.value))

const updateUsername = () => {
  loading.value = true
  getUserProfile(props.userProfile.id)
      .then(async (profile) => {
        profile.username = state.username
        return await saveUserProfile(profile)
      })
      .then((profile) => {
        if (profile) {
          updateUserProfile()
          showSuccessToaster({key: 'notification.profileNameUpdated'})
          navigateTo(`${PAGES.PROFILE.path}/${profile.username}`, {replace: true})
        }
      })
      .catch(notifyByError)
      .finally(() => loading.value = false)
}

</script>

<template>
  <UForm :state="state" :schema="schema" @submit="updateUsername">
    <UFormGroup :label="username.label" :name="username.name" :description="username.description"
                :required="username.required" eager-validation
                class="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center"
                :ui="{ container: '' }">
      <UInput :type="username.type" :placeholder="username.placeholder" v-model="state.username"
              :required="username.required"/>
    </UFormGroup>

    <UDashboardSection>
      <template #links>
        <UButton type="submit" :label="t('button.UpdateUsername')" :loading="loading" :disabled="loading"/>
      </template>
    </UDashboardSection>
  </UForm>
</template>