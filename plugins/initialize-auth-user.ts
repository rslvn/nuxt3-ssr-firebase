export default defineNuxtPlugin(async () => {
    const {setAuthUserByCookie} = useAuthUser()
    await setAuthUserByCookie()
});