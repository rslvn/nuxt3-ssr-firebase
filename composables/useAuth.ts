export default function () {

    const {setAuthUser} = useAuthStore()

    const getAndSetAuthUserByCookie = async () => {
        const headers = useRequestHeaders(['cookie'])
        const authUser = await $fetch("/api/auth/user", {headers});
        console.log('>>>> getAndSetAuthUserByCookie found authUser', !!authUser)
        setAuthUser(authUser)
    }

    const getAndSetAuthUserByHeader = async (token: string) => {
        const authUser = await $fetch("/api/auth/user", {
            headers: {
                Authorization: `${token}`
            }
        });
        console.log('>>>> getAndSetAuthUserByHeader found authUser', !!authUser)
        setAuthUser(authUser)
    }

    const removeAuthUser = async () => {
        await $fetch("/api/auth/logout")
        setAuthUser(null)
    }

    return {
        getAndSetAuthUserByCookie,
        getAndSetAuthUserByHeader,
        removeAuthUser
    }
}