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
// import Nav from "./component/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
                <i class='bx bx-menu'  ></i>
                <span className="logo_name">Blog App</span>
              </div>

              <ul className="nav-links">
                <li onClick={() => setToggle(true)}>
                  <Link to="/home">
                    <i class='bx bx-home'></i>
                    <span className="link_name">Home</span>
                  </Link>
                </li>


                <li onClick={() => setToggle(true)}>
                  <Link to="/createBlog">
                    <i class='bx bxs-message-square-detail'></i>
                    <span className="link_name">Blog</span>
                  </Link>
                </li>

                <li onClick={() => setToggle(true)}>
                  <Link to="/save" >
                    <i class='bx bx-save'></i>
                    <span className="link_name">Saved</span>
                  </Link>
                </li>


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


              <SaveContext>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/createBlog">
                  {auth ? <Blog /> : <div className="signUp">
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
              </SaveContext>
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
