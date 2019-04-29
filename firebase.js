import Firebase from 'firebase'
import '@firebase/firestore'

const config = {
  apiKey: "AIzaSyB0vDwgxVbYCqufBY06mo-Ji5G7QXwffcQ",
  authDomain: "playing-with-firestore-ea560.firebaseapp.com",
  databaseURL: "https://playing-with-firestore-ea560.firebaseio.com",
  projectId: "playing-with-firestore-ea560",
  storageBucket: "playing-with-firestore-ea560.appspot.com",
  messagingSenderId: "474404060227"
};

export const firebase = Firebase.initializeApp(config)

