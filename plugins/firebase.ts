import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()

  const firebaseConfig = runtimeConfig.public.firebase
  const firebaseApp = initializeApp(firebaseConfig)
  const firebaseAuth = getAuth(firebaseApp)
  const firebaseStore = getFirestore(firebaseApp)
  const firebaseStorage = getStorage(firebaseApp)

  return {
    provide: {
      firebaseApp,
      firebaseAuth,
      firebaseStore,
      firebaseStorage,
    },
  }
})
