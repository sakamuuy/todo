import firebase from "firebase";

export const initializeFirebase = () => {
  if (firebase.apps.length) return;
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREASE_PROJECT_ID
  })
};

export class FStore {
  private db;

  constructor() {
    this.db = firebase.firestore();
  }

  getDB() {
    return this.db;
  }
}