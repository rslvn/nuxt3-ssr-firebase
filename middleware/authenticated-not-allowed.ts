/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { authUserRef } = useAuthUserState()
  const { PAGES, authenticatedUserNotAllowed } = usePages()
  if (authUserRef.value && authenticatedUserNotAllowed(to.path)) {
    return navigateTo({ path: PAGES.HOME.path })
  }
})
