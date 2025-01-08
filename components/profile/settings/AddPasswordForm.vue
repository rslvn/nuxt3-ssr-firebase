<script setup lang="ts">
import { UserProfile } from '~/types'

const props = defineProps<{
  userProfile: UserProfile
}>()

const {password, confirmPassword, getSchema} = useFormSchema()
const {notifyByError, showSuccessToaster} = useNotifyUser()
const {t} = useI18n()
const {linkPassword} = useFirebaseAuth()

const loading = ref(false)
const state = reactive({
  password: '',
  confirmPassword: ''
})
const fields = [password, confirmPassword]
const schema = computed(() => getSchema(fields))

const addPassword = async () => {
  loading.value = true

  await linkPassword(props.userProfile.email, state.password)
    .then(() => {
      showSuccessToaster({key: 'notification.profilePasswordUpdated'})
    })
    .catch(notifyByError)
    .finally(() => loading.value = false)
}
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="addPassword">
    <UDashboardSection :title="t('button.AddPassword')">
      <UFormGroup :label="t('field.password.label')" :name="password.name"
                  :description="t('field.password.description')"
                  :required="password.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput v-model="state.password" :type="password.type" :placeholder="t('field.newPassword.placeholder')" />
      </UFormGroup>

      <UFormGroup :label="t('field.confirmPassword.label')" :name="confirmPassword.name"
                  :description="t('field.confirmPassword.description')"
                  :required="confirmPassword.required"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  :ui="{ container: '' }">
        <UInput v-model="state.confirmPassword" :type="confirmPassword.type"
                :placeholder="t('field.newPasswordConfirm.placeholder')" />
      </UFormGroup>

      <template #links>
        <UBadge color="orange" variant="soft">
          {{ t('notification.noEmailAuthentication') }}
        </UBadge>
      </template>
    </UDashboardSection>

    <UDashboardSection>
      <template #links>
        <UButton type="submit" :label="t('button.AddPassword')" :loading="loading"
                 :disabled="loading" />
      </template>
    </UDashboardSection>
  </UForm>
</template>
