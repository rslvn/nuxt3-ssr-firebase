<script setup lang="ts">
import {signOut} from "firebase/auth";
import {PAGES} from "~/types";

const {t} = useI18n()
// const user = useCurrentUser()
const firebaseAuth = useFirebaseAuth()
const {user, profile} = useAuthUser()

const navigateToProfile = () => {
  if (profile.value?.username) {
    return navigateTo(`${PAGES.PROFILE.path}/${profile.value.username}`)
  }
}
const items = computed(() => [
  [
    {
      label: profile.value?.username || user.value.email,
      icon: "i-heroicons-user",
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
      },
      click: navigateToProfile
    }
  ],
  [
    {
      label: t('common.SignOut'),
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: async () => {
        await signOut(firebaseAuth)
      }
    }
  ]
])
</script>

<template>
  <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-52' }">
    <UAvatar v-if="user.photoURL" :src="user.photoURL" :alt="user.displayName||'user' + ' avatar'" size="sm"/>
    <UButton
        v-else
        color="gray"
        square
        variant="ghost"
        icon="i-heroicons-user"
    />
  </UDropdown>
</template>