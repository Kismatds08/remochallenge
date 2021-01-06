import * as firebase from 'firebase';
import 'firebase/firestore' 
import 'firebase/auth'

// TODO: fill in your firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBWmzFjLvFQJOYOJmkJ8iWLYNlK9qudZYA",
    authDomain: "remo-challenge-2e239.firebaseapp.com",
    databaseURL: 'https://remo-challenge-2e239.firebaseio.com',
    projectId: "remo-challenge-2e239",
    storageBucket: "remo-challenge-2e239.appspot.com",
    messagingSenderId: "823477089077",
    appId: "1:823477089077:web:0822cef599051b80b1527c",
    measurementId: "G-3PZQYQ921F"
};


firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export const firestore = firebase.firestore()

export const createUserProfileDocument = async (user, additionalData) => {

 if(!user) return 

    const userRef = firestore.doc(`users/${user.uid}`) 

    const snapShot = await userRef.get()
    if(!snapShot.exists){
        
        const {email, displayName} = user
        const createdAt = new Date()

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(error){
            console.log("Error Creating a User Document", error.message)
        }
    }

    return userRef
}

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({prompt:'select_account'})


export const signInwithGoogle = () => auth.signInWithPopup(provider)

export default firebase;