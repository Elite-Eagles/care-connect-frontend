import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase/auth'
import { firebaseLogin } from '../actions/login';

export async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider)
    const id = await response.user.getIdToken()
    firebaseLogin(id)
}

export async function handleFacebookSignIn() {
    const provider = new FacebookAuthProvider();
    const response = await signInWithPopup(auth, provider)
    const id = await response.user.getIdToken()
    firebaseLogin(id)
}