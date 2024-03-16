import {defineStore} from 'pinia'
import {AuthState, AuthUser} from "~/types";

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
    }
})
