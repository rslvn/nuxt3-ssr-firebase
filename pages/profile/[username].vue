<script setup lang="ts">
import {UserProfile} from "~/types";

definePageMeta({
  middleware: ['authenticated-allowed'],
})

const {seoMetaInputByUserProfile} = useAppSeoMeta()

const {t} = useI18n()
const {getUserProfileByUsername} = useUserProfileCollection()
const {userProfile, isUsernameOfLoggedInUser} = useAuthUser()
const {params} = useRoute()

const username = params.username as string
if (!username) {
  throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
}

const profile = ref(null as UserProfile)
const isMyProfile = isUsernameOfLoggedInUser(username)

onMounted(async () => {
  profile.value = isMyProfile ? userProfile.value : await getUserProfileByUsername(username)
  if (!profile.value) {
    throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
  }
  useSeoMeta(seoMetaInputByUserProfile(profile.value))
})

</script>

<template>
  <section>
    <ProfileHeader v-if="profile" :user-profile="profile" :is-my-profile="isMyProfile"/>
    <ProfileHeaderSkeleton v-else/>
  </section>

</template>
