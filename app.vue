<template>
  <NuxtLayout>
    <NuxtPage/>
    <UNotifications/>
  </NuxtLayout>
</template>
<script setup lang="ts">
// import {signOut} from "firebase/auth";
import {AUTHENTICATED_NOT_ALLOWED_ROUTES, PAGES} from "~/types";

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()
const {t} = useI18n()
const {setAuthStoreByUser} = useAuthUser()

onErrorCaptured((error, instance, info) => {
  console.log('[errorCaptured] error', error, 'instance:', instance, 'info:', info)
  // if(info === 'setup function'){
  //   throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
  // }
})

// we don't need this watcher on server
onMounted(async () => {
  watch(user, async (user, prevUser) => {
    await setAuthStoreByUser(user)
    if (prevUser && prevUser.emailVerified && !user) {
      // user logged out
      console.log(new Date(), '>>>> user logged out')
      return router.push(PAGES.LOGIN.path)

      // } else if (user && !user.emailVerified) {
      //   // user email is not verified, force logout
      //   console.log(new Date(), '>>>> force user logout')
      //   await signOut(firebaseAuth)

    } else if (user && typeof route.query.redirect === 'string') {
      // user logged in
      console.log(new Date(), '>>>> user logged in')
      return router.push(route.query.redirect)

    } else if (user && AUTHENTICATED_NOT_ALLOWED_ROUTES.includes(route.path)) {
      return router.push(PAGES.HOME.path)

    } else {
      console.log(new Date(), '>>>> user logged in, no action')
    }
  })
})

await getCurrentUser()
    .then(async (value) => await setAuthStoreByUser(value))

</script>