<script setup lang="ts">
import { UserProfile } from '~/types'

const props = defineProps<{
  userProfile: UserProfile
}>()

const { about, firstName, middleName, lastName, getSchema } = useFormSchema()
const { getUserProfile, saveUserProfile } = useUserProfileCollection()
const { notifyByError, showSuccessToaster } = useNotifyUser()
const { reloadUserProfile } = useUserProfileState()
const { t } = useI18n()

const loading = ref(false)
const state = reactive({
  firstName: props.userProfile?.name?.firstName || '',
  middleName: props.userProfile?.name?.middleName || '',
  lastName: props.userProfile?.name?.lastName || '',
  about: props.userProfile?.about || '',
})
const fields = [about, firstName, middleName, lastName]
const schema = getSchema(fields)

const updateProfile = () => {
  loading.value = true
  getUserProfile(props.userProfile.id)
    .then(async (profile) => {
      profile.name = {
        firstName: state.firstName?.trim() || '',
        middleName: state.middleName?.trim() || '',
        lastName: state.lastName?.trim() || '',
      }
      profile.about = state.about ? state.about.trim() : ''
      return await saveUserProfile(profile)
    })
    .then((profile) => {
      if (profile) {
        reloadUserProfile()
        showSuccessToaster({ key: 'notification.profileNameUpdated' })
      }
    })
    .catch(notifyByError)
    .finally(() => loading.value = false)
}
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="updateProfile">
    <UDashboardSection :title="t('button.UpdateProfile')"
                       description="This information will be displayed publicly so be careful what you share.">
      <UFormGroup :label="t(firstName.label)" :name="firstName.name" :description="t(firstName.description)"
                  :required="firstName.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput v-model="state.firstName" :type="firstName.type" :placeholder="t(firstName.placeholder)" />
      </UFormGroup>

      <UFormGroup :label="t(middleName.label)" :name="middleName.name" :description="t(middleName.description)"
                  :required="middleName.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput v-model="state.middleName" :type="middleName.type" :placeholder="t(middleName.placeholder)" />
      </UFormGroup>

      <UFormGroup :label="t(lastName.label)" :name="lastName.name" :description="t(lastName.description)"
                  :required="lastName.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '', error: 'text-sm' }">
        <UInput v-model="state.lastName" :type="lastName.type" :placeholder="t(lastName.placeholder)" />
      </UFormGroup>

      <UFormGroup :label="t(about.label)" :name="about.name" :description="t(about.description)"
                  :required="about.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '', error: 'text-sm' }">
        <UTextarea v-model="state.about" :placeholder="t(about.placeholder)" :rows="5" autoresize size="md" />
      </UFormGroup>
    </UDashboardSection>

    <UDashboardSection>
      <template #links>
        <UButton type="submit" :label="t('button.UpdateProfile')" :loading="loading" :disabled="loading" />
      </template>
    </UDashboardSection>
  </UForm>
</template>
