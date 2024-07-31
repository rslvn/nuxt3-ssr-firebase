<script setup lang="ts">
import {PROVIDER_CONFIGS, ProviderConfig} from '~/types'

const {notifyByError, showWarningToaster, showSuccessToaster} = useNotifyUser()
const {getCurrentProviderIds, isPasswordProvider} = useAuthProviders()
const {linkProviderId, unlinkProviderId, getCurrentProviderId} = useFirebaseAuth()
const {authUserRef} = useAuthUserState()
const {t} = useI18n()

const linkAccountBusy = ref(false)
const currentProviderId = ref(await getCurrentProviderId())
const currentProviderIds = computed(() => getCurrentProviderIds(authUserRef.value))

const linkAccount = (providerConfig: ProviderConfig) => {
  if (isPasswordProvider(providerConfig.providerId)) {
    return
  }

  linkAccountBusy.value = true
  return linkProviderId(providerConfig.providerId)
    .then(async () => {
      showSuccessToaster({key: 'notification.accountProviderLinked', params: {provider: providerConfig.name}})
      currentProviderId.value = await getCurrentProviderId()
    })
    .catch(notifyByError)
    .finally(() => linkAccountBusy.value = false)
}

const unlinkAccount = (providerConfig: ProviderConfig) => {
  if (currentProviderIds.value.length <= 1) {
    showWarningToaster({key: 'notification.cantUnlinkTheLastProvider', params: {provider: providerConfig.name}})
    return
  }

  if (providerConfig.providerId === currentProviderId.value) {
    showWarningToaster({
      key: 'notification.cantUnlinkCurrentSignInProvider',
      params: {provider: providerConfig.name}
    })
    return
  }

  return unlinkProviderId(providerConfig.providerId)
    .then(() => {
      showSuccessToaster({key: 'notification.accountProviderUnlinked', params: {provider: providerConfig.name}})
    })
    .catch(notifyByError)
}
</script>

<template>
  <UDashboardPanelContent class="p-0 pb-24 divide-y divide-gray-200 dark:divide-gray-800">
    <UDashboardSection
      :title="t('page.profileSettings.linkedAccounts.title')"
      :description="t('page.profileSettings.linkedAccounts.description')"
      orientation="horizontal"
    >
      <UCard :ui="{ body: { base: 'divide-y divide-gray-200 dark:divide-gray-800 gap-4 flex flex-col' } }">
        <UFormGroup
          v-for="providerConfig in PROVIDER_CONFIGS"
          :key="providerConfig.providerId"
          :name="providerConfig.name"
          class="flex flex-row items-center justify-between pt-4 first:pt-0 gap-2"
          :ui="{ container: 'flex' }"
        >
          <template #label>
            <div class="flex flex-row items-center justify-center">
              <UIcon :name="providerConfig.icon" :class="'text-'+providerConfig.color+'-500'"
                     class="text-2xl sm:text-3xl" dynamic />
              <span class="ml-2"> {{ providerConfig.name }} </span>
              <UPopover v-if="currentProviderId === providerConfig.providerId" class="ml-2" mode="hover">
                <UButton icon="i-heroicons-star-16-solid" color="green" variant="soft" />
                <template #panel>
                  <div class="p-4">
                    <span>{{
                      t('page.profileSettings.linkedAccounts.currentLogin', { provider: providerConfig.name })
                    }}</span>
                  </div>
                </template>
              </UPopover>
            </div>
          </template>

          <ConfirmButton
            v-if="currentProviderIds.includes(providerConfig.providerId)"
            :label="t('common.Disconnect')"
            :confirm-title="t('dialog.unlinkAccount.title', { provider: providerConfig.name })"
            :confirm-description="t('dialog.unlinkAccount.description', { provider: providerConfig.name })"
            :on-confirm="() => unlinkAccount(providerConfig)"
            :confirm-button-label="t('common.Disconnect')"
          />

          <UButton
            v-else-if="!isPasswordProvider(providerConfig.providerId) && !currentProviderIds.includes(providerConfig.providerId)"
            variant="ghost" :loading="linkAccountBusy" :disabled="linkAccountBusy"
            @click="() => linkAccount(providerConfig)">
            {{ t('common.Connect') }}
          </UButton>
        </UFormGroup>
      </UCard>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>

<style scoped>

</style>