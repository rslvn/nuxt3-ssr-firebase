<script setup lang="ts">
import {signOut} from "firebase/auth"

const {t} = useI18n()
const user = useCurrentUser()
const firebaseAuth = useFirebaseAuth()
const { isHeaderDialogOpen } = useUIState()

const closeDialog = () => {
  isHeaderDialogOpen.value = false
}

const logOff = () => {
  signOut(firebaseAuth)
  closeDialog()
}

</script>

<template>
  <UHeader>
    <template #logo>
      nuxt3-ssr
      <UBadge label="firebase" variant="subtle" class="mb-0.5 hidden md:flex"/>
    </template>

    <template #right>
      <RegisterBar v-if="!user?.emailVerified" class="hidden lg:flex"/>

      <UColorModeButton class="hidden md:block"/>

      <client-only>
        <LanguageSelectDropdown class="hidden md:block"/>
        <nav-user v-if="user && user.emailVerified"/>
      </client-only>
    </template>

    <template #panel>
      <div class="flex flex-row justify-evenly my-6">
        <UColorModeSelect/>
        <LanguageSelect/>
      </div>
      <UDivider class="my-6"/>
      <RegisterBar v-if="!user?.emailVerified" block />
      <UButton v-if="user" :label="t('common.SignOut')" color="green" variant="ghost"
               @click="logOff" block/>
    </template>
  </UHeader>
</template>