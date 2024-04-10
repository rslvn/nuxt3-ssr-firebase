import {
    applyActionCode,
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    verifyPasswordResetCode
} from "firebase/auth";

export default function () {

    const loginWithPassword = (email: string, password: string) => {
        return signInWithEmailAndPassword(getAuth(), email, password)
    }

    const logout = () => {
        return signOut(getAuth())
    }

    const registerWithPassword = async (email: string, password: string) => {
        return await createUserWithEmailAndPassword(getAuth(), email, password)
            .then(async (userCredentials) => {
                await sendEmailVerification(userCredentials.user)
            })
    }

    const refreshToken = () => {
        return getAuth().currentUser.getIdToken(true);
    }

    const verifyEmail = (oobCode: string) => {
        return applyActionCode(getAuth(), oobCode)
            .then(() => {
                refreshToken()
            })
    }

    const sendEmailVerificationMail = () => {
        return sendEmailVerification(getAuth().currentUser)
    }

    const sendResetPasswordMail = (email: string) => {
        return sendPasswordResetEmail(getAuth(), email)
    }

    const resetPassword = async (oobCode: string, newPassword: string) => {
        return await verifyPasswordResetCode(getAuth(), oobCode)
            .then(async () => {
                await confirmPasswordReset(getAuth(), oobCode, newPassword)
            })
    }

    return {
        // listenAuthStateChanged,
        loginWithPassword,
        logout,
        refreshToken,
        registerWithPassword,
        resetPassword,
        sendEmailVerificationMail,
        sendResetPasswordMail,
        verifyEmail,
        firebaseAuth: getAuth()
    }
}