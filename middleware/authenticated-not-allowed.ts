import {AUTHENTICATED_NOT_ALLOWED_ROUTES, PAGES} from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const {authUser} = useAuthStore()
    if (authUser && AUTHENTICATED_NOT_ALLOWED_ROUTES.includes(to.path)) {
        return navigateTo({path: PAGES.HOME.path})
    }
})