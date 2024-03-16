<script setup lang="ts">
import {ProvideInjectType, UserProfile} from "~/types";

const props = defineProps<{
  userProfile: UserProfile
}>()

const {updateUserProfile} = inject(ProvideInjectType.USER_PROFILE_UPDATED)

const {firstName, middleName, lastName, getSchema} = useFormFields()
const {getUserProfile, saveUserProfile} = useUserProfileCollection()
const {notifyByError, showSuccessToaster} = useNotifyUser()
const {t} = useI18n()

const loading = ref(false)
const state = reactive({
  firstName: props.userProfile?.name?.firstName || '',
  middleName: props.userProfile?.name?.middleName || '',
  lastName: props.userProfile?.name?.lastName || '',
})
const fields = computed(() => [firstName.value, middleName.value, lastName.value])
const schema = computed(() => getSchema(fields.value))

const updateProfile = () => {
  loading.value = true
  getUserProfile(props.userProfile.id)
      .then(async (profile) => {
        profile.name = state
        return await saveUserProfile(profile)
      })
      .then((profile) => {
        if (profile) {
          updateUserProfile()
          showSuccessToaster({key: 'notification.profileNameUpdated'})
        }
      })
      .catch(notifyByError)
      .finally(() => loading.value = false)
}

</script>

<template>
  <UForm :state="state" :schema="schema" @submit="updateProfile">
    <UDashboardSection :title="t('button.UpdateProfileName')"
                       description="This information will be displayed publicly so be careful what you share.">
      <UFormGroup :label="firstName.label" :name="firstName.name" :description="firstName.description"
                  :required="firstName.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput :type="firstName.type" :placeholder="firstName.placeholder" v-model="state.firstName"/>
      </UFormGroup>

      <UFormGroup :label="middleName.label" :name="middleName.name" :description="middleName.description"
                  :required="middleName.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput :type="middleName.type" :placeholder="middleName.placeholder" v-model="state.middleName"/>
      </UFormGroup>

      <UFormGroup :label="lastName.label" :name="lastName.name" :description="lastName.description"
                  :required="lastName.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '', error: 'text-sm' }">
        <UInput :type="lastName.type" :placeholder="lastName.placeholder" v-model="state.lastName"/>
      </UFormGroup>
    </UDashboardSection>

    <UDashboardSection>
      <template #links>
        <UButton type="submit" :label="t('button.UpdateProfileName')" :loading="loading" :disabled="loading"/>
      </template>
    </UDashboardSection>
  </UForm>
</template>