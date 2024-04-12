import {PAGES} from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const {authUser} = useAuthStore()
    if (!authUser) {
        return navigateTo({path: PAGES.LOGIN.path, query: {redirect: to.fullPath}})
    }
})