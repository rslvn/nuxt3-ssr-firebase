import {
    applyActionCode,
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
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
        return Promise.resolve(getAuth().currentUser)
            .then(user => user?.getIdToken(true))
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

    const updateUserPassword = async (email: string, oldPassword: string, newPassword: string) => {
        const user = getAuth().currentUser;
        const emailProvider = EmailAuthProvider.credential(email, oldPassword)
        return await reauthenticateWithCredential(user, emailProvider)
            .then(async () => {
                await updatePassword(user, newPassword)
            })
    }

    return {
        loginWithPassword,
        logout,
        refreshToken,
        registerWithPassword,
        resetPassword,
        sendEmailVerificationMail,
        sendResetPasswordMail,
        updateUserPassword,
        verifyEmail,
        firebaseAuth: getAuth()
    }
}