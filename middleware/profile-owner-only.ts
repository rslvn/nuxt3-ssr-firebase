import {PAGES} from '~/types'

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const username = to.params.username as string
  const {authUserRef} = useAuthUserState()
  if (authUserRef.value?.username !== username) {
    return navigateTo({path: PAGES.HOME.path})
  }
})