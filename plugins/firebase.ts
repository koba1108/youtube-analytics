import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDVU_AzP5ylpfHCfJA6iA48uwh8hdhACbg",
    authDomain: "ykoba-dev.firebaseapp.com",
    databaseURL: "https://ykoba-dev.firebaseio.com",
    projectId: "ykoba-dev",
    storageBucket: "ykoba-dev.appspot.com",
    messagingSenderId: "187038027851",
    appId: "1:187038027851:web:9d22390aa134efb3853dce",
    measurementId: "G-VPCZ3LQBBN"
  })
}

export default firebase
