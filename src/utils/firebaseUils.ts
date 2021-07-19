import firebase from "firebase";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREASE_PROJECT_ID
})
class FStore {
  private db;

  constructor() {
    this.db = firebase.firestore();
  }

  getDB() {
    return this.db;
  }
}

export const db = new FStore().getDB();