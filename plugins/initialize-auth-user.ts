export default defineNuxtPlugin(async () => {
  if (process.env.NODE_ENV === 'test') {
    return
  }
  const {setAuthUserByCookie} = useAuthUserState()
  await setAuthUserByCookie()
})
