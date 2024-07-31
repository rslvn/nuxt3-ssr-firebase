export default defineNuxtPlugin(async () => {
  const {setAuthUserByCookie} = useAuthUserState()
  await setAuthUserByCookie()
})