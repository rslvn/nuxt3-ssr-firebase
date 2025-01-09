<script setup lang="ts">
import { UserProfile } from '~/types'

const props = defineProps<{
  userProfile: UserProfile
}>()

const { password, confirmPassword, oldPassword, getSchema } = useFormSchema()
const { notifyByError, showSuccessToaster } = useNotifyUser()
const { t } = useI18n()
const { updateUserPassword } = useFirebaseAuth()

const showConfirmModal = ref(false)
const state = reactive({
  password: '',
  confirmPassword: '',
  oldPassword: '',
})
const fields = [password, confirmPassword, oldPassword]
const schema = computed(() => getSchema(fields))

const changePassword = async () => {
  await updateUserPassword(props.userProfile.email, state.oldPassword, state.password)
    .then(() => {
      showSuccessToaster({ key: 'notification.profilePasswordUpdated' })
    })
    .catch(notifyByError)
}
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="showConfirmModal = true">
    <UDashboardSection :title="t('button.ChangePassword')">
      <UFormGroup :label="t(oldPassword.label)" :name="oldPassword.name" :description="t(oldPassword.description)"
                  :required="oldPassword.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '', error: 'text-sm' }">
        <UInput v-model="state.oldPassword" :type="oldPassword.type" :placeholder="t(oldPassword.placeholder)" />
      </UFormGroup>

      <!--      add a new field newPassword -->
      <UFormGroup :label="t('field.newPassword.label')" :name="password.name"
                  :description="t('field.newPassword.description')"
                  :required="password.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput v-model="state.password" :type="password.type" :placeholder="t('field.newPassword.placeholder')" />
      </UFormGroup>

      <!--      add a new field newPasswordConfirm -->
      <UFormGroup :label="t('field.newPasswordConfirm.label')" :name="confirmPassword.name"
                  :description="t('field.newPasswordConfirm.description')"
                  :required="confirmPassword.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput v-model="state.confirmPassword" :type="confirmPassword.type"
                :placeholder="t('field.newPasswordConfirm.placeholder')" />
      </UFormGroup>
    </UDashboardSection>

    <UDashboardSection>
      <template #links>
        <UButton type="submit" :label="t('button.ChangePassword')" :loading="showConfirmModal"
                 :disabled="showConfirmModal" />
      </template>
    </UDashboardSection>
    <ConfirmDialogModal v-model="showConfirmModal"
                        :title="t('dialog.changePassword.title')"
                        :description="t('dialog.changePassword.description')"
                        :on-confirm="changePassword"
                        :confirm-button-label="t('button.ChangePassword')"
    />
  </UForm>
</template>
