<script setup lang="ts">
import {PAGES} from '~/types'

const {t} = useI18n()
const authStore = useAuthStore()
const {notifyByError} = useNotifyUser()
const {logout} = useFirebaseAuth()

const navigateToProfile = () => {
  if (authStore.authUser?.username) {
    return navigateTo(`${PAGES.PROFILE.path}/${authStore.authUser.username}`)
  }
}
const items = computed(() => [
  [
    {
      label: authStore.authUser?.username || authStore.authUser?.email,
      icon: 'i-heroicons-user',
      slot: 'profile',
      click: navigateToProfile
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
])
</script>

<template>
  <UDropdown :items="items" :ui="{ item: { icon: { base: 'w-6 h-6' }, size:'text-md' } }">
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