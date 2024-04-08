<template>
  <NuxtLayout>
    <NuxtPage/>
    <UNotifications/>
  </NuxtLayout>
</template>
<script setup lang="ts">
// import {signOut} from "firebase/auth";

console.log(new Date(), '>>>> app.vue')

// import {User} from "@firebase/auth";
// import {AUTHENTICATED_NOT_ALLOWED_ROUTES, PAGES} from "~/types";

// const router = useRouter()
// const route = useRoute()
// const user = useCurrentUser()
// const {$firebaseAuth} = useNuxtApp()
// const {setAuthStoreByUser} = useAuthUser()



// $firebaseAuth && $firebaseAuth.onAuthStateChanged(userChanged)

// $firebaseAuth.onIdTokenChanged(user => {
//   console.log('>>>> $firebaseAuth.onIdTokenChanged')
//   userChanged(user)
// })

onErrorCaptured((error, instance, info) => {
  console.log('[errorCaptured] error', error, 'instance:', instance, 'info:', info)
  // if(info === 'setup function'){
  //   throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
  // }
})

</script>