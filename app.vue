<template>
  <NuxtLayout>
    <NuxtPage/>
    <UNotifications/>
  </NuxtLayout>
</template>
<script setup lang="ts">

import {User} from "@firebase/auth";
import {AUTHENTICATED_NOT_ALLOWED_ROUTES, PAGES} from "~/types";

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const {setAuthUserByHeader, removeAuthUser} = useAuthUser()

// const forceTokenRefresh = (user: User) => {
//   const forceRefresh = localStorage.getItem('forceRefresh')
//   if (forceRefresh) {
//     localStorage.removeItem('forceRefresh')
//     user.getIdToken(true)
//         .then((token: string) => {
//           setAuthUserByHeader(token)
//         })
//   }
// }

const userChanged = async (user: User) => {
  if (user) {
    await user.getIdToken()
        .then(async (token) => {
          await setAuthUserByHeader(token)
          // forceTokenRefresh(user)
        })

    if (typeof route.query.redirect === 'string') {
      // user logged in
      console.log(new Date(), '>>>> user logged in')
      return router.push(route.query.redirect)

    } else if (AUTHENTICATED_NOT_ALLOWED_ROUTES.includes(route.path)) {
      return router.push(PAGES.HOME.path)

    } else {
      console.log(new Date(), '>>>> user logged in, no action')
    }

  } else {
    await removeAuthUser()
    console.log(new Date(), '>>>> user logged out')
    if (authStore.authUser && !AUTHENTICATED_NOT_ALLOWED_ROUTES.includes(route.path)) {
      return router.push(PAGES.LOGIN.path)
    }
  }
}

onMounted(() => {
  const {firebaseAuth} = useFirebaseAuth()
  firebaseAuth && firebaseAuth.onIdTokenChanged(userChanged)
})
onErrorCaptured((error, instance, info) => {
  console.log('[errorCaptured] error', error, 'instance:', instance, 'info:', info)
  // if(info === 'setup function'){
  //   throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
  // }
})

</script>