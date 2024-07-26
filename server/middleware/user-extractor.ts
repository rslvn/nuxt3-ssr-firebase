import {getAuth} from "firebase-admin/auth";
import {EventHandlerRequest, H3Event} from "h3";

const decodeIdToken = async (sessionCookie: string) => {
    const decodedIdToken = await getAuth().verifySessionCookie(sessionCookie, true)
    return await getAuth().getUser(decodedIdToken.uid)
}

const getUserFromCookie = async (event: H3Event<EventHandlerRequest>) => {
    console.log('lookup session cookie')
    const runtimeConfig = useRuntimeConfig();
    const sessionCookie = getCookie(event, runtimeConfig.public.authCookieName)
    if (!sessionCookie) {
        console.log('>>>> no cookie found')
        return
    }
    console.log('>>>> cookie FOUND')

    return await decodeIdToken(sessionCookie)
}

const getUserFromHeader = async (event: H3Event<EventHandlerRequest>) => {
    try {
        console.log('lookup authorizationToken')
        const runtimeConfig = useRuntimeConfig();
        const authorizationToken = getRequestHeader(event, 'Authorization')
        if (!authorizationToken) {
            console.log('No authorizationToken')
            return
        }
        console.log('authorizationToken found')

        const sessionCookie = await getAuth().createSessionCookie(authorizationToken, {expiresIn: runtimeConfig.public.authCookieExpires});
        if (!sessionCookie) {
            console.log('No sessionCookie created')
            return
        }

        setCookie(event, runtimeConfig.public.authCookieName, sessionCookie, {
            maxAge: runtimeConfig.public.authCookieExpires,
            sameSite: "strict",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        return await decodeIdToken(sessionCookie)
    } catch (error) {
        console.log('>>>> getUserFromHeader error:',error)
    }
}

export default defineEventHandler(async (event) => {
    try {
        if (!event.path.startsWith('/api/') || event.path.startsWith('/api/auth/logout')) {
            return
        }
        event.context.user = await getUserFromHeader(event) || await getUserFromCookie(event)

        console.log('>>> extracted user:', !!event.context.user)
    } catch (error) {
        console.log('error on extraction authUser for path: ', event.path, error)
        return
    }
});
