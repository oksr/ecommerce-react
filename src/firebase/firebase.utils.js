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
    // const collectionRef = firestore.collection('users');

    const snapShot = await userRef.get();
    // const collectionSnapshot = await collectionRef.get();
    
    // console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

    if (!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error){
        console.log('error creating user ', error.message);
      }
    }
    return userRef;
  };

  export const addCollectionAndDocuments = async (collectionKey, objectsoToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
   
    const batch = firestore.batch();
    objectsoToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });
   
    return await batch.commit()
  }

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc=> {
      const {title, items } = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    } , {})
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;