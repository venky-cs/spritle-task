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
  const [slide,setSlide]=useState(false)
  
  return (
    <Router>
      <Switch>
        <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
         
              <div className="app">
                <div className="main">
                  
                  {/* <div className="sidebar" style={slide ? {flex:".15"} : {flex:"0.10"}}>
                  </div> */}
              <div className="sidebar" style={slide ? { flex: ".15" } : { flex: ".1" }}>
                <Nav sign={auth ? signOut :signIn}  auth={auth} slide={setSlide}/>
                  </div>


                  <div className="mainbar">
                <SaveContext>
                    <Route path="/home">
                      <Home />
                    </Route>
                  <Route path="/createBlog">
                     {auth ? <Blog /> : <>
                     <h2>SignUp</h2>
                     <Button onClick={signIn}>Click Here to login</Button>
                     </>}
                    </Route>
                  <Route path="/blog/:slug">
                    <BlogPost />
                  </Route>
                  <Route path="/save">
                    <Saved />
                  </Route>
                </SaveContext>
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

        
        </FirebaseAuthProvider>
      </Switch>
    </Router>
  );

  function signIn(){
    const googleAuthProvider =
      new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  }
  function signOut(){
    firebase.auth().signOut();
  }

}

export default App;
