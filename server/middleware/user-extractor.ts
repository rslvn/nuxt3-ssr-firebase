import {getAuth} from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
    try {
        if (!event.path.startsWith('/api/')) return
        console.log('user-extractor.ts called for ', event.path)
        const sessionCookie = getCookie(event, '__session') as string
        if (!sessionCookie) {
            console.log('>>>> no cookie found')
            return
        }

        console.log('>>>> cookie FOUND')

        const token = await getAuth().verifySessionCookie(sessionCookie, true)
        const user = await getAuth().getUser(token.uid)
        event.context.user = user

        console.log('>>> extracted user:', !!user)
    } catch (error) {
        console.log('error on extraction authUser for path: ', event.path, error)
        return
    }
});
