export default function () {

    const getAuthUserByCookie = async () => {
        const headers = useRequestHeaders(['cookie'])
        return await $fetch("/api/auth/user", {headers})
    }

    const getAuthUserByHeader = async (token: string) => {
       return await $fetch("/api/auth/user", {
            headers: {
                Authorization: `${token}`
            }
        })
    }

    const logout = async () => {
        await $fetch("/api/auth/logout")
    }

    return {
        getAuthUserByCookie,
        getAuthUserByHeader,
        logout
    }
}