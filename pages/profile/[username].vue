<script setup lang="ts">

const {seoMetaInputByUserProfile} = useAppSeoMeta()

const {t} = useI18n()
const {getUserProfileByUsername} = useUserProfileCollection()
const {userProfile} = useAppGlobals()
const {params} = useRoute()
const authStore = useAuthStore()

const username = params.username as string
if (!username) {
  throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
}

await getUserProfileByUsername(username)
    .then((profile) => {
      if (!profile) {
        console.log('>>>> no profile found by username', username)
        throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
      }
      userProfile.value = profile
    })
    .catch((reason) => {
      if (reason?.code === 'permission-denied') {
        throw createError({statusCode: 403, statusMessage: t('page.accessDenied'), fatal: true})
      }
      console.log('>>>> error when profile loading',reason)
      throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
    })

useSeoMeta(seoMetaInputByUserProfile(userProfile.value))

const isMyProfile = computed(() => userProfile.value?.id === authStore.authUser?.userId);

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
