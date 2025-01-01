<script setup lang="ts">
definePageMeta({
  middleware: ['profile-owner-only'],
})
const { t, locale } = useI18n()
const { getProfileSettingsPath, getProfileAccountSettingsPath } = usePages()
const { userProfileRef } = useUserProfileState()
const leftLinks = computed(() => {
  if (!locale) {
    return []
  }

  return [
    {
      label: t('page.profileSettings.navigator.profileSettings'),
      icon: 'i-heroicons-pencil-square-20-solid',
      to: getProfileSettingsPath(userProfileRef.value?.username),
      exact: true
    },
    {
      label: t('page.profileSettings.navigator.accountSettings'),
      icon: 'i-heroicons-shield-check-20-solid',
      to: getProfileAccountSettingsPath(userProfileRef.value?.username)
    }
  ]
})

const links = computed(() => {
  return [leftLinks.value]
})
</script>

<template>
  <UContainer :ui="{ padding: 'px-2' }">
    <UPage>
      <template #left>
        <UVerticalNavigation :links="links" :ui="{ label: 'text-md', icon: { base: 'w-6 h-6' } }" />
      </template>
      <NuxtPage />
    </UPage>
  </UContainer>
</template>
