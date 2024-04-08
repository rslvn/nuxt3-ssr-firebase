import useAuth from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
    const {getAndSetAuthUserByCookie} = useAuth()
    await getAndSetAuthUserByCookie()
});