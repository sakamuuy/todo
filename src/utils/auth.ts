import firebase from 'firebase'

export const getLoginUser = () => {
  return firebase.auth().currentUser
}

export const startObserveAuth = ({
  onSignIn,
  onSignOut,
}: {
  onSignIn: (user: firebase.User) => void
  onSignOut: (user: null) => void
}) => {
  firebase.auth().onAuthStateChanged((user) => {
    return user ? onSignIn(user) : onSignOut(user)
  })
}

export const doLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential as firebase.auth.OAuthCredential

      if (!credential) throw new Error('Fail login')

      // const token = credential.accessToken;
      // const user = result.user;

      // console.log(token, user)
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = error.credential;
    })
}
