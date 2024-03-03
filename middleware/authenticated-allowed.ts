import {PAGES} from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser()
    if (!user) {
        return navigateTo({path: PAGES.LOGIN.path, query: {redirect: to.fullPath}})
    }
})