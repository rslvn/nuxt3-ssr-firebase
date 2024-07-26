import {defineStore} from 'pinia'
import {AuthState, AuthUser} from '~/types'

const {getAuthUserByCookie, getAuthUserByHeader, logout} = useAuthApi()

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => {
    return {
      authUser: null
    }
  },
  actions: {
    setAuthUser(authUser: AuthUser) {
      this.authUser = authUser
    },
    async setAuthUserByCookie() {
      const authUser = await getAuthUserByCookie()
      this.setAuthUser(authUser)
    },
    async setAuthUserByHeader(token: string) {
      const authUser = await getAuthUserByHeader(token)
      this.setAuthUser(authUser)
    },
    async removeAuthUser() {
      await logout()
      this.setAuthUser(null)
    }
  }
})
