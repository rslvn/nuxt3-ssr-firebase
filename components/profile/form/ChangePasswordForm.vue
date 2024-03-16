<script setup lang="ts">
import {UserProfile} from "~/types";
import {EmailAuthProvider, reauthenticateWithCredential, updatePassword} from "firebase/auth";
import {User} from "@firebase/auth";

const props = defineProps<{
  userProfile: UserProfile
}>()

const {password, confirmPassword, oldPassword, getSchema} = useFormFields()
const {getUserProfile, saveUserProfile} = useUserProfileCollection()
const {notifyByError, showSuccessToaster} = useNotifyUser()
const {t} = useI18n()

const loading = ref(false)
const state = reactive({
  password: '',
  confirmPassword: '',
  oldPassword: '',
})
const fields = computed(() => [password.value, confirmPassword.value, oldPassword.value])
const schema = computed(() => getSchema(fields.value))

const changePassword = async () => {
  loading.value = true

  await getCurrentUser()
      .then(async (user: User) => {
        const emailProvider = EmailAuthProvider.credential(props.userProfile.email, state.oldPassword)
        await reauthenticateWithCredential(user, emailProvider)
            .then(async (userCredentials) => {
              await updatePassword(user, state.password)
                  .then(() => {
                    showSuccessToaster({key: 'notification.profilePasswordUpdated'})
                  })
            })
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
        <UInput :type="oldPassword.type" :placeholder="oldPassword.placeholder" v-model="state.oldPassword"/>
      </UFormGroup>

      <UFormGroup :label="t('field.newPassword.label')" :name="password.name"
                  :description="t('field.newPassword.description')"
                  :required="password.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput :type="password.type" :placeholder="t('field.newPassword.placeholder')" v-model="state.password"/>
      </UFormGroup>

      <UFormGroup :label="t('field.newPasswordConfirm.label')" :name="confirmPassword.name"
                  :description="t('field.newPasswordConfirm.description')"
                  :required="confirmPassword.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput :type="confirmPassword.type" :placeholder="t('field.newPasswordConfirm.placeholder')"
                v-model="state.confirmPassword"/>
      </UFormGroup>

    </UDashboardSection>

    <UDashboardSection>
      <template #links>
        <UButton type="submit" :label="t('button.ChangePassword')" :loading="loading" :disabled="loading"/>
      </template>
    </UDashboardSection>
  </UForm>
</template>