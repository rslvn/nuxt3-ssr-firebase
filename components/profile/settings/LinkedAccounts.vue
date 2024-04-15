<script setup lang="ts">

import {PROVIDER_CONFIGS, ProviderConfig} from "~/types";
import pro from "@nuxt/ui-pro/modules/pro";

const {notifyByError, showWarningToaster, showSuccessToaster} = useNotifyUser()
const {getCurrentProviderIds,socialProviderConfigs, isPasswordProvider} = useAuthProviders()
const {linkProviderId, unlinkProviderId, getCurrentProviderId, sendResetPasswordMail} = useFirebaseAuth();
const authStore = useAuthStore();
const {t} = useI18n()

const busy = ref(false)
const currentProviderId = ref(await getCurrentProviderId())
const currentProviderIds = computed(() => getCurrentProviderIds(authStore.authUser))
console.log('>>>> currentProviderId', currentProviderId)

const linkAccount = (providerConfig: ProviderConfig) => {
  if (busy.value) {
    return
  }

  busy.value = true
  if (isPasswordProvider(providerConfig.providerId)) {
    return
  }

  return linkProviderId(providerConfig.providerId)
      .then(async () => {
        showSuccessToaster({key: 'notification.accountProviderLinked', params: {provider: providerConfig.name}})
        currentProviderId.value = await getCurrentProviderId()
      })
      .catch(notifyByError)
      .finally(() => {
        busy.value = false
      })
}

const unlinkAccount = (providerConfig: ProviderConfig) => {
  if (busy.value) {
    return
  }

  if (currentProviderIds.value.length <= 1) {
    return showWarningToaster({key: 'notification.cantUnlinkTheLastProvider', params: {provider: providerConfig.name}})
  }

  if (providerConfig.providerId === currentProviderId.value) {
    return showWarningToaster({
      key: 'notification.cantUnlinkCurrentSignInProvider',
      params: {provider: providerConfig.name}
    })
  }

  busy.value = true
  return unlinkProviderId(providerConfig.providerId)
      .then(() => {
        showSuccessToaster({key: 'notification.accountProviderUnlinked', params: {provider: providerConfig.name}})
      })
      .catch(notifyByError)
      .finally(() => {
        busy.value = false
      })
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
              <UIcon :name="providerConfig.icon" :class="'text-'+providerConfig.color+'-500'" class="text-2xl sm:text-3xl" dynamic/>
              <span class="ml-2"> {{ providerConfig.name }} </span>
              <UPopover v-if="currentProviderId === providerConfig.providerId" class="ml-2" mode="hover">
                <UButton icon="i-heroicons-star-16-solid" color="green" variant="soft"/>
                <template #panel>
                  <div class="p-4">
                    <span>{{t('page.profileSettings.linkedAccounts.currentLogin', {provider: providerConfig.name})}}</span>
                  </div>
                </template>
              </UPopover>
            </div>

          </template>

          <span v-if="isPasswordProvider(providerConfig.providerId) && !currentProviderIds.includes(providerConfig.providerId)"></span>

          <UButton v-else-if="currentProviderIds.includes(providerConfig.providerId)" color="gray" variant="ghost"
                   :loading="busy" :disabled="busy" @click="() => unlinkAccount(providerConfig)">
            {{ t('common.Disconnect') }}
          </UButton>
          <UButton v-else variant="ghost" :loading="busy" :disabled="busy"  @click="() => linkAccount(providerConfig)">
            {{ t('common.Connect') }}
          </UButton>
        </UFormGroup>
      </UCard>
    </UDashboardSection>
  </UDashboardPanelContent>

</template>

<style scoped>

</style>