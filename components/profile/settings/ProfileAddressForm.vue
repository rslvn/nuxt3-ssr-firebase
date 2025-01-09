<script setup lang="ts">
import { Country } from 'country-state-city'
import { UserProfile } from '~/types'

const props = defineProps<{
  userProfile: UserProfile
}>()

const { country, getSchema } = useFormSchema()
const { getUserProfile, saveUserProfile } = useUserProfileCollection()
const { notifyByError, showSuccessToaster } = useNotifyUser()
const { reloadUserProfile } = useUserProfileState()
const { t } = useI18n()

const loading = ref(false)
const state = reactive({
  country: props.userProfile?.address?.country,
})
const fields = [country]
const schema = getSchema(fields)

const updateAddress = () => {
  loading.value = true
  getUserProfile(props.userProfile.id)
    .then(async (profile) => {
      profile.address = {
        country: state.country ? state.country.trim() : ''
      }
      return await saveUserProfile(profile)
    })
    .then((profile) => {
      if (profile) {
        reloadUserProfile()
        showSuccessToaster({ key: 'notification.profileAddressUpdated' })
      }
    })
    .catch(notifyByError)
    .finally(() => loading.value = false)
}

const countries = ref(Country.getAllCountries())

const selectedCountry = computed(() => {
  return countries.value.find(country => country.isoCode === state.country)
})
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="updateAddress">
    <UDashboardSection :title="t('button.UpdateAddress')" />
    <UFormGroup :label="t(country.label)" :name="country.name" :description="t(country.description)"
                :required="country.required"
                class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                :ui="{ container: '' }">
      <USelectMenu
        v-model="state.country"
        searchable
        selected-icon="i-heroicons-check-solid"
        :searchable-placeholder="t(country.placeholder)"
        :options="countries"
        option-attribute="name"
        value-attribute="isoCode"
      >
        <template #label>
          <template v-if="selectedCountry">
            <span class="text-2xl">{{ selectedCountry.flag }}</span>
            <span>{{ selectedCountry.name }}</span>
          </template>
          <span v-else>{{ country.placeholder }}</span>
        </template>

        <template #option="{ option: countryOption }">
          <span class="text-2xl">{{ countryOption.flag }}</span>
          <span>{{ countryOption.name }}</span>
        </template>
      </USelectMenu>
    </UFormGroup>

    <UDashboardSection>
      <template #links>
        <UButton type="submit" :label="t('button.UpdateAddress')" :loading="loading" :disabled="loading" />
      </template>
    </UDashboardSection>
  </UForm>
</template>
