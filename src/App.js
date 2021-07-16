import { useState } from "react";
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
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import BlogPost from './component/BlogPost';
import SaveContext from './context/SaveContext'
import Saved from "./component/Saved";
import Button from "./component/Button"
import Home from "./component/Home";
import Blog from "./component/Blog";
require("dotenv").config();

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <Router>
      <Switch>
        <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
          <SaveContext>
              <div className="app">
                <div className="main">
            {/* <Route exact path="/"> */}
                  <div className="sidebar">
                    <Nav  />
                  </div>
                {/* </Route> */}


                  <div className="mainbar">
                    <Route path="/home">
                      <Home />
                    </Route>
                  <Route path="/createBlog">
                     {auth ? <Blog /> : <h2>SignUp</h2>}
                    </Route>
                  <Route path="/blog/:slug">
                    <BlogPost />
                  </Route>
                  <Route path="/save">
                    <Saved />
                  </Route>
                  </div>

                  <div className="sign">
                    {!auth && (
                      <Button variant="google"
                        onClick={() => {
                          const googleAuthProvider =
                            new firebase.auth.GoogleAuthProvider();
                          firebase.auth().signInWithPopup(googleAuthProvider);
                        }}
                      >
                        Sign In with Google
                      </Button>
                    )}

                    {auth && (
                      <Button variant="google"
                        onClick={() => {
                          firebase.auth().signOut();
                        }}
                      >
                        Sign Out
                      </Button>
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

          </SaveContext>
        </FirebaseAuthProvider>
      </Switch>
    </Router>
  );
}

export default App;
