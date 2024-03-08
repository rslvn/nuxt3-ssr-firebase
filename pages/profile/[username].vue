<script setup lang="ts">

const {seoMetaInputByUserProfile} = useAppSeoMeta()

const {t} = useI18n()
const {getUserProfileByUsername} = useUserProfileCollection()
const currentUser = await getCurrentUser()
const {params} = useRoute()

const username = params.username as string
if (!username) {
  throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
}

const userProfile = ref(await getUserProfileByUsername(username))
if (!userProfile.value) {
  throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
}
useSeoMeta(seoMetaInputByUserProfile(userProfile.value))

const isMyProfile = ref(userProfile.value.id === currentUser?.uid);
console.log('isMyProfile', isMyProfile.value, 'username', username)

</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <section>
        <ProfileHeader v-if="userProfile" :user-profile="userProfile" :is-my-profile="isMyProfile"/>
        <ProfileHeaderSkeleton v-else/>
      </section>

      <ProfileModules v-if="userProfile" :user-profile="userProfile" :is-my-profile="isMyProfile"/>
    </UDashboardPanel>
  </UDashboardPage>
</template>
