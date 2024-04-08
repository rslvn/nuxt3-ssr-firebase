<template>
  <NuxtLayout>
    <NuxtPage/>
    <UNotifications/>
  </NuxtLayout>
</template>
<script setup lang="ts">

import {AUTHENTICATED_NOT_ALLOWED_ROUTES, PAGES} from "~/types";
import {User} from "@firebase/auth";

console.log(new Date(), '>>>> app.vue')

const router = useRouter()
const route = useRoute()
const {getAndSetAuthUserByHeader, removeAuthUser} = useAuth()


const userChanged = async (user: User) => {
  console.log('>>>>> userChanged', !!user)
  if (user) {
    //
    await user.getIdToken()
        .then(async (token: string) => {
          await getAndSetAuthUserByHeader(token)
          // sessionCookie.value = token
        })
    //
    if (typeof route.query.redirect === 'string') {
      // user logged in
      console.log(new Date(), 'client', process.client, 'server', process.server, '>>>> user logged in')
      return router.push(route.query.redirect)

    } else if (AUTHENTICATED_NOT_ALLOWED_ROUTES.includes(route.path)) {
      return router.push(PAGES.HOME.path)

    } else {
      console.log(new Date(), 'client', process.client, 'server', process.server, '>>>> user logged in, no action')
    }

  } else {
    await removeAuthUser()
    console.log(new Date(), 'client', process.client, 'server', process.server, '>>>> user logged out')
    return router.push(PAGES.LOGIN.path)
  }
}

onMounted(() => {
  const {$firebaseAuth} = useNuxtApp()
  $firebaseAuth && $firebaseAuth.onAuthStateChanged(userChanged)
})
onErrorCaptured((error, instance, info) => {
  console.log('[errorCaptured] error', error, 'instance:', instance, 'info:', info)
  // if(info === 'setup function'){
  //   throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
  // }
})

</script>