import {PAGES} from '~/types'

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const {authUser} = useAuthStore()
  if (!authUser) {
    return navigateTo({path: PAGES.LOGIN.path, query: {redirect: to.fullPath}})
  }
})