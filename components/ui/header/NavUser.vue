<script setup lang="ts">
import {PAGES} from '~/types'

const {t, locale} = useI18n()
const authStore = useAuthStore()
const {notifyByError} = useNotifyUser()
const {logout} = useFirebaseAuth()

const navigateToProfile = () => {
  if (authStore.authUser?.username) {
    return navigateTo(`${PAGES.PROFILE.path}/${authStore.authUser.username}`)
  }
}

const navigateToProfileSettings = () => {
  if (authStore.authUser?.username) {
    return navigateTo(`${PAGES.PROFILE.path}/${authStore.authUser.username}/settings`)
  }
}

const items = computed(() => {
  if (!locale) { // locale changed trick for i18n
    return []
  }

  return [
    [
      {
        label: authStore.authUser?.username || authStore.authUser?.email,
        icon: 'i-heroicons-user',
        slot: 'profile',
        click: navigateToProfile
      },
      {
        label: t('common.Settings'),
        icon: 'i-heroicons-cog-6-tooth',
        click: navigateToProfileSettings
      }
    ],
    [
      {
        label: t('common.SignOut'),
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: async () => {
          await logout()
            .catch(notifyByError)
        }
      }
    ]
  ]
})
</script>

<template>
  <UDropdown :items="items" :ui="{ item: { icon: { base: 'w-6 h-6' }, size: 'text-md' } }">
    <UButton
      color="gray"
      square
      variant="ghost"
      :ui="{ icon: { size: { sm: 'w-6 h-6' } } }"
    >
      <img class="object-cover rounded-full bg-center h-7 w-7"
           :src="authStore.authUser.profilePhoto.src" alt="asdasd">
    </UButton>

    <template #profile>
      <img class="object-cover rounded-full bg-center h-6 w-6"
           :src="authStore.authUser.profilePhoto.src" alt="asdasd">
      <span> {{ authStore.authUser?.displayName || 'Profile' }}</span>
    </template>
  </UDropdown>
</template>