<script setup lang="ts">
import {signOut} from "firebase/auth"

const {t} = useI18n()
const {$firebaseAuth} = useNuxtApp();
const {isHeaderDialogOpen} = useUIState()
const authStore = useAuthStore()

const closeDialog = () => {
  isHeaderDialogOpen.value = false
}

const logOff = () => {
  signOut($firebaseAuth)
  closeDialog()
}

</script>

<template>
  <UHeader :ui="{logo: 'text-2xl'}">
    <template #logo>
      nuxt3-ssr
      <UBadge label="firebase" variant="subtle" class="mb-0.5 hidden md:flex"/>
    </template>

    <template #right>
      <RegisterBar v-if="!authStore.authUser" class="hidden lg:flex"/>
      <!--      <RegisterBar v-if="!user?.emailVerified" class="hidden lg:flex"/>-->

      <UColorModeButton class="hidden md:block"/>

      <LanguageSelectDropdown class="hidden md:block"/>
      <NavUser v-if="authStore.authUser"/>
      <!--        <NavUser v-if="user && user.emailVerified"/>-->
    </template>

    <template #panel>
      <div class="grid grid-cols-2 gap-x-2">
        <UColorModeSelect/>
        <LanguageSelect/>
      </div>
      <UDivider class="my-6"/>
      <RegisterBar v-if="!authStore.authUser" block/>
      <!--      <RegisterBar v-if="!user?.emailVerified" block/>-->
      <UButton v-if="authStore.authUser" :label="t('common.SignOut')" color="green" variant="ghost"
               @click="logOff" block/>
    </template>
  </UHeader>
</template>