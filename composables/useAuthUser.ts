export default function () {

    const {setAuthUser} = useAuthStore()
    const {getAuthUserByCookie, getAuthUserByHeader, logout} = useAuthApi()

    const setAuthUserByCookie = async () => {
        const authUser = await getAuthUserByCookie()
        setAuthUser(authUser)
    }

    const setAuthUserByHeader = async (token: string) => {
        const authUser = await getAuthUserByHeader(token)
        setAuthUser(authUser)
    }

    const removeAuthUser = async () => {
        await logout()
        setAuthUser(null)
    }

    return {
        setAuthUserByCookie,
        setAuthUserByHeader,
        removeAuthUser
    }

}