import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {User} from "@firebase/auth";
import {AUTHENTICATED_NOT_ALLOWED_ROUTES, PAGES} from "~/types";

export default defineNuxtPlugin(async () => {
    console.log(new Date(), '>>>> firebase.client.ts')
    const runtimeConfig = useRuntimeConfig()

    const firebaseConfig = runtimeConfig.public.firebase;
    const firebaseApp = initializeApp(firebaseConfig);
    const firebaseAuth = getAuth(firebaseApp);
    const firebaseStore = getFirestore(firebaseApp);
    const firebaseStorage = getStorage(firebaseApp)

    const router = useRouter()
    const route = useRoute()
    const userChanged = async (user: User) => {
        const authUser = await $fetch("/api/auth/user");
        const {setAuthUser} = useAuthStore()
        console.log('firebase.ts authUser:', authUser)
        setAuthUser(authUser)
        if (!user) {
            console.log(new Date(), '>>>> user logged out')
            return router.push(PAGES.LOGIN.path)
        } else if (user && typeof route.query.redirect === 'string') {
            // user logged in
            console.log(new Date(), '>>>> user logged in')
            return router.push(route.query.redirect)

        } else if (user && AUTHENTICATED_NOT_ALLOWED_ROUTES.includes(route.path)) {
            return router.push(PAGES.HOME.path)

        } else {
            console.log(new Date(), '>>>> user logged in, no action')
        }
    }
    firebaseAuth.onAuthStateChanged(userChanged)

    return {
        provide: {
            firebaseApp,
            firebaseAuth,
            firebaseStore,
            firebaseStorage,
        },
    };
});
