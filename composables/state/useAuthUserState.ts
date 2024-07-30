import {AuthUser} from '~/types'

export default function () {
  const authUserRef = useState<AuthUser>('authUserState')

  const getAuthUserByCookie = async () => {
    const headers = useRequestHeaders(['cookie'])
    return await $fetch('/api/auth/user', {headers})
  }

  const getAuthUserByHeader = async (token: string) => {
    return await $fetch('/api/auth/user', {
      headers: {
        Authorization: `${token}`
      }
    })
  }

  const logout = async () => {
    await $fetch('/api/auth/logout')
  }

  const setAuthUserByCookie = async () => {
    authUserRef.value = await getAuthUserByCookie()
  }

  const setAuthUserByHeader = async (token: string) => {
    authUserRef.value = await getAuthUserByHeader(token)
  }

  const removeAuthUser = async () => {
    await logout()
      .finally(() => {
        authUserRef.value = null
      })
  }

  return {
    authUserRef,
    setAuthUserByCookie,
    setAuthUserByHeader,
    removeAuthUser
  }
}