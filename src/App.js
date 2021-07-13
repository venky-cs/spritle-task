import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig'
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
require("dotenv").config();



function App() {
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <div>
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </button>

        <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
        
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              // <pre style={{ height: 300, overflow: "auto" }}>
              //   {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              // </pre>
              null
            );
          }}
        </FirebaseAuthConsumer>
        <div>
          <IfFirebaseAuthed>
            {() => {
              return <div>You are authenticated</div>;
            }}
          </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }}
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </FirebaseAuthProvider>
  );
}

export default App;
