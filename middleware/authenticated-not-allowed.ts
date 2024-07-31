import {AUTHENTICATED_NOT_ALLOWED_ROUTES, PAGES} from '~/types'

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const {authUserRef} = useAuthUserState()
  if (authUserRef.value && AUTHENTICATED_NOT_ALLOWED_ROUTES.includes(to.path)) {
    return navigateTo({path: PAGES.HOME.path})
  }
})