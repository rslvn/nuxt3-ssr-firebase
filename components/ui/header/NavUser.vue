<script setup lang="ts">
import {signOut} from "firebase/auth";
import {PAGES} from "~/types";

const {t} = useI18n()
// const user = useCurrentUser()
const firebaseAuth = useFirebaseAuth()
const {user, userProfile} = useAuthUser()

const navigateToProfile = () => {
  if (userProfile.value?.username) {
    return navigateTo(`${PAGES.PROFILE.path}/${userProfile.value.username}`)
  }
}
const items = computed(() => [
  [
    {
      label: userProfile.value?.username || user.value?.email,
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
  <UDropdown :items="items" :ui="{ item: { icon: {base: 'w-6 h-6'}, size:'text-md' } }">
    <UAvatar v-if="user?.photoURL" :src="user.photoURL" :alt="user.displayName||'user' + ' avatar'"/>
    <UButton
        v-else
        color="gray"
        square
        variant="ghost"
        icon="i-heroicons-user"
        :ui="{icon: {size: {sm: 'w-6 h-6'}}}"
    />
  </UDropdown>
</template>