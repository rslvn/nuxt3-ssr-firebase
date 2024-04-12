import {cert, getApp, initializeApp} from "firebase-admin/app";

/**
 * Make sure that we initialize the firebase app only once
 */
const createFirebaseApp = () => {
    console.log(new Date(), '>>>> firebase.server.ts')
    const config = useRuntimeConfig();
    try {
        return getApp();
    } catch {
        const firebaseConfig = {
            credential: cert(JSON.parse(config.serviceAccount))
        };
        return initializeApp(firebaseConfig);
    }
};

export default defineNuxtPlugin(() => {
    createFirebaseApp();
});
