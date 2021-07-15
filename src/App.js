import { useState,useEffect } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import Nav from "./component/Nav";
import Content from "./component/Content";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import BlogPost from './component/BlogPost'
require("dotenv").config();

function App() {
  const [auth, setAuth] = useState(false);
  const [page, setPage] = useState("home");
  return (
    <Router>
        <Switch>
        <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
          <Route exact path="/">
      <div className="app">
        <div className="main">
          <Nav setPage={setPage}/>

          <Content page={page} auth={auth}/>

          <div className="sign">
            {!auth && (
              <button
                onClick={() => {
                  const googleAuthProvider =
                    new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(googleAuthProvider);
                }}
              >
                Sign In with Google
              </button>
            )}

            {auth && (
              <button
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                Sign Out
              </button>
            )}
          </div>

          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              setAuth(isSignedIn);
            }}
          </FirebaseAuthConsumer>
          <div>
            <IfFirebaseAuthed>
              {() => {
                // return <div>You are authenticated</div>;
              }}
            </IfFirebaseAuthed>
            <IfFirebaseAuthedAnd
              filter={({ providerId }) => providerId !== "anonymous"}
            >
              {({ providerId }) => {
                // return <div>You are authenticated with {providerId}</div>;
              }}
            </IfFirebaseAuthedAnd>
          </div>
        </div>
      </div>
          </Route>

          <Route path="/blog/:slug">
            <BlogPost />
          </Route>
    </FirebaseAuthProvider>
        </Switch>
      </Router>
  );
}

export default App;
