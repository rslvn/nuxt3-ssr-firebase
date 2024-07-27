<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>

<script setup lang="ts">
import {User} from '@firebase/auth'
import {AUTHENTICATED_NOT_ALLOWED_ROUTES, PAGES} from '~/types'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const userChanged = async (user: User) => {
  if (user) {
    await user.getIdToken()
      .then(async (token) => {
        await authStore.setAuthUserByHeader(token)
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
    await authStore.removeAuthUser()
    if (authStore.authUser && !AUTHENTICATED_NOT_ALLOWED_ROUTES.includes(route.path)) {
      return router.push(PAGES.LOGIN.path)
    } else if (PAGES.HOME.path !== route.path) {
      // re-trigger middleware of the current page if the path is not home in case of logout
      console.log('>>> Force reload because signed out from a page that is not home page. the page path:', route.path)
      reloadNuxtApp()
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