export default defineNuxtPlugin(async () => {
  const {setAuthUserByCookie} = useAuthStore()
  await setAuthUserByCookie()
})