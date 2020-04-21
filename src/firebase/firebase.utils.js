import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBL9ZNb-1xiKPI6OmYJx0W-TVjNEba0DBc",
    authDomain: "crown-db-584cc.firebaseapp.com",
    databaseURL: "https://crown-db-584cc.firebaseio.com",
    projectId: "crown-db-584cc",
    storageBucket: "crown-db-584cc.appspot.com",
    messagingSenderId: "427995724986",
    appId: "1:427995724986:web:f8c8cf81e621a6bebdd683"
  };
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName, email, createdAt, ...additionalData
        })
      } catch (error){
        console.log('error: ', error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;