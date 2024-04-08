
export default defineNuxtPlugin(async () => {
    const authUser = await $fetch("/api/auth/user",{
        headers: useRequestHeaders(["cookie"]) as HeadersInit,
    });
    const {setAuthUser} = useAuthStore()
    console.log('initialize-auth-user.ts authUser:', authUser)
    setAuthUser(authUser)
});