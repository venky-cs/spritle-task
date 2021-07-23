import { useState, useEffect } from "react";
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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BlogPost from './component/BlogPost';
import Saved from "./component/Saved";
import Button from "./component/Button"
import Home from "./component/Home";
import Blog from "./component/Blog";
require("dotenv").config();

function App() {
  const [auth, setAuth] = useState(false);


  const [toggle, setToggle] = useState(true)

  const [userName, setUserName] = useState("")
  const [userImage, setUserImage] = useState("")

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      setUserName(displayName)
      setUserImage(photoURL)
    }
  }, [auth])


  return (
    <Router>
      <Switch>
        <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>

          <div className="app">
            <div className={`sidebar ${toggle && "close"}`}>
              <div className="logo-details" onClick={toggler}>
                <i className='bx bx-menu'  ></i>
                <span className="logo_name">Blog App</span>
              </div>

              <ul className="nav-links">
                <li onClick={() => setToggle(true)}>
                  <Link to="/home">
                    <i className='bx bx-home'></i>
                    <span className="link_name">Home</span>
                  </Link>
                </li>

                {auth && <>
                  <li onClick={() => setToggle(true)}>
                    <Link to="/createBlog">
                      <i className='bx bxs-message-square-detail'></i>
                      <span className="link_name">Write Blog</span>
                    </Link>
                  </li>

                  <li onClick={() => setToggle(true)}>
                    <Link to="/myBlog" >
                      <i class="fas fa-id-card"></i>
                      <span className="link_name">My Blog</span>
                    </Link>
                  </li>
                </>}

                <li onClick={() => setToggle(true)}>
                  <Link to="/save" >
                    <i className='bx bx-save'></i>
                    <span className="link_name">Favourite</span>
                  </Link>
                </li>

                {!auth &&
                  <li onClick={() => {
                    setToggle(true)
                  signIn()
                    }}>
                  <Link>
                    <i class="fas fa-sign-in-alt"></i>
                      <span className="link_name">LogIn</span>
                    </Link>
                  </li>
                }



                <div className="profile-details">
                  {auth &&
                    <>
                      <div className="profile-content">
                        <img src={userImage} alt="profileImg" />
                      </div>
                      <div className="name-job">
                        <div className="profile_name">{userName}</div>
                      </div>
                      <i className='bx bx-log-out' style={{ color: 'red', padding: "20px", cursor: "pointer", width: "50px" }} onClick={signOut}></i>
                    </>}

                </div>
              </ul>
            </div>
            <section class="home-section">

              <Route path="/home">
                <Home />
              </Route>
              <Route path="/createBlog">
                {auth ? <Blog user={userName} pic={userImage} /> : <div className="signUp">
                  <h2>SignUp</h2>
                  <Button onClick={signIn}>Login to Continue...</Button>
                </div>}
              </Route>
              <Route path="/blog/:slug">
                <BlogPost />
              </Route>
              <Route path="/save">
                <Saved />
              </Route>
            </section>


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


        </FirebaseAuthProvider>
      </Switch>
    </Router>
  );

  function signIn() {
    const googleAuthProvider =
      new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  }
  function signOut() {
    firebase.auth().signOut();
  }
  function toggler() {
    setToggle(prevState => !prevState)
  }

}

export default App;
