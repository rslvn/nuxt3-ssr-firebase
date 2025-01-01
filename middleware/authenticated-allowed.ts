/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { authUserRef } = useAuthUserState()
  const { PAGES } = usePages()
  if (!authUserRef.value) {
    return navigateTo({ path: PAGES.LOGIN.path, query: { redirect: to.fullPath } })
  }
})
