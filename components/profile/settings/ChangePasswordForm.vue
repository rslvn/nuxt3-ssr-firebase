<script setup lang="ts">
import {ProviderIdType, UserProfile} from "~/types";

const props = defineProps<{
  userProfile: UserProfile
}>()

const {password, confirmPassword, oldPassword, getSchema} = useFormFields()
const {notifyByError, showSuccessToaster} = useNotifyUser()
const {t} = useI18n()
const {updateUserPassword} = useFirebaseAuth()
const authStore = useAuthStore()

const loading = ref(false)
const state = reactive({
  password: '',
  confirmPassword: '',
  oldPassword: '',
})
const fields = computed(() => [password.value, confirmPassword.value, oldPassword.value])
const schema = computed(() => getSchema(fields.value))

const noPasswordProvider = computed(() => !authStore.authUser?.providers?.find(userInfo => userInfo.providerId === ProviderIdType.PASSWORD))

const changePassword = async () => {
  loading.value = true

  await updateUserPassword(props.userProfile.email, state.oldPassword, state.password)
      .then(() => {
        showSuccessToaster({key: 'notification.profilePasswordUpdated'})
      })
      .catch(notifyByError)
      .finally(() => loading.value = false)
}

</script>

<template>
  <UForm :state="state" :schema="schema" @submit="changePassword">
    <UDashboardSection :title="t('button.ChangePassword')">
      <UFormGroup :label="oldPassword.label" :name="oldPassword.name" :description="oldPassword.description"
                  :required="oldPassword.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '', error: 'text-sm' }">
        <UInput :type="oldPassword.type" :placeholder="oldPassword.placeholder" v-model="state.oldPassword"
                :disabled="noPasswordProvider"/>
      </UFormGroup>

      <UFormGroup :label="t('field.newPassword.label')" :name="password.name"
                  :description="t('field.newPassword.description')"
                  :required="password.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput :type="password.type" :placeholder="t('field.newPassword.placeholder')" v-model="state.password"
                :disabled="noPasswordProvider"/>
      </UFormGroup>

      <UFormGroup :label="t('field.newPasswordConfirm.label')" :name="confirmPassword.name"
                  :description="t('field.newPasswordConfirm.description')"
                  :required="confirmPassword.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput :type="confirmPassword.type" :placeholder="t('field.newPasswordConfirm.placeholder')"
                v-model="state.confirmPassword" :disabled="noPasswordProvider"/>
      </UFormGroup>

    </UDashboardSection>

    <UDashboardSection>
      <template #links>
        <UBadge v-if="noPasswordProvider" color="orange" variant="soft">
          {{ t('notification.noEmailAuthentication') }}
        </UBadge>
        <UButton v-else type="submit" :label="t('button.ChangePassword')" :loading="loading"
                 :disabled="loading"/>
      </template>
    </UDashboardSection>
  </UForm>
</template>