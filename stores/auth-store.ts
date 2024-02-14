import {acceptHMRUpdate, defineStore} from 'pinia'



export const useAuthStore = defineStore('auth-store', {
    state: () => {
        return {
            counter: 0
        }
    },
    actions: {
        increase() {
            this.counter++
        },
        decrease() {
            this.counter--
        },
    }
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
