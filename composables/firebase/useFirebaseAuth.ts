import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  unlink,
  updatePassword,
  verifyPasswordResetCode,
} from 'firebase/auth'
import {PROVIDER_CONFIGS} from '~/types'

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
    const user = getAuth().currentUser
    const emailProvider = EmailAuthProvider.credential(email, oldPassword)
    return await reauthenticateWithCredential(user, emailProvider)
      .then(async () => {
        await updatePassword(user, newPassword)
      })
  }

  const getAuthProvider = (providerId: string) => {
    switch (providerId) {
      case PROVIDER_CONFIGS.GOOGLE.providerId:
        return new GoogleAuthProvider()

      case PROVIDER_CONFIGS.FACEBOOK.providerId:
        return new FacebookAuthProvider()

      case PROVIDER_CONFIGS.TWITTER.providerId:
        return new TwitterAuthProvider()

      default:
        throw new Error(
                    `No social auth provider for provider id ${providerId}`
        )
    }
  }

  const signInWithSocialProvider = (providerId: string) => {
    return signInWithPopup(getAuth(), getAuthProvider(providerId))
  }

  const linkPassword = async (email: string, password: string) => {
    const emailProvider = EmailAuthProvider.credential(email, password)
    return await linkWithCredential(getAuth().currentUser, emailProvider)
      .then(async () => {
        await refreshToken()
      })
  }

  const linkProviderId = async (providerId: string) => {
    return await linkWithPopup(getAuth().currentUser, getAuthProvider(providerId))
      .then(async () => {
        await refreshToken()
      })
  }

  const unlinkProviderId = async (providerId: string) => {
    return await unlink(getAuth().currentUser, providerId)
      .then(async () => {
        await refreshToken()
      })
  }

  const getCurrentProviderId = async () => {
    return await Promise.resolve(getAuth().currentUser)
      .then(async user => await user?.getIdTokenResult().then(idTokenResult => idTokenResult.signInProvider))
  }

  return {
    getCurrentProviderId,
    linkProviderId,
    linkPassword,
    loginWithPassword,
    logout,
    refreshToken,
    registerWithPassword,
    resetPassword,
    sendEmailVerificationMail,
    sendResetPasswordMail,
    signInWithSocialProvider,
    unlinkProviderId,
    updateUserPassword,
    verifyEmail,
    firebaseAuth: getAuth()
  }
}