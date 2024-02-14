<script setup lang="ts">
import {signOut} from "firebase/auth";
const {t} = useI18n()
const user = useCurrentUser()
const firebaseAuth = useFirebaseAuth();
const items = [
  [
    {
      slot: 'account',
      disabled: true
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
]
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
    <template #account>
      <div class="text-left truncate">
        {{ user.displayName || user.email }}
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"/>
    </template>
  </UDropdown>
</template>