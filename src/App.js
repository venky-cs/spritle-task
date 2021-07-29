import { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BlogPost from "./component/BlogPost";
import Saved from "./component/Saved";
import Button from "./component/Button";
import Home from "./component/Home";
import Blog from "./component/Blog";
import Edit from "./component/Edit";
import MyBlog from "./component/MyBlog";
import Remove from "./component/Remove";
import Table from "./component/Table";
import Archive from "./component/Archive";
require("dotenv").config();

function App() {
  const [auth, setAuth] = useState(false);

  const [toggle, setToggle] = useState(true);
  const [dropDown, setdropDown] = useState(false);

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      setUserName(displayName);
      setUserImage(photoURL);
    }
  }, [auth]);

  return (
    <Router>
      <Switch>
        <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
          <div className="app">
            {/* sidebar */}
            <div className={`sidebar ${toggle && "close"}`}>
              <div className="logo-details" onClick={toggler}>
                <i className="bx bx-menu"></i>
                <span className="logo_name">Blog App</span>
              </div>

              <ul className="nav-links">
                <li onClick={() => setToggle(true)}>
                  <Link to="/home">
                    <i className="bx bx-home"></i>
                    <span className="link_name">Home</span>
                  </Link>
                </li>

                {auth && (
                  <>
                    <li className={` ${dropDown ? "showMenu" : null}`}>
                      <div className="icon-link">
                        <Link to="/admin">
                          <i className="fas fa-users-cog"></i>
                          <span className="link_name">Admin</span>
                        </Link>
                        <i
                          className="bx bxs-chevron-down arrow"
                          onClick={() => setdropDown((prevState) => !prevState)}
                        ></i>
                      </div>
                      <ul className="sub-menu" onClick={() => setToggle(true)}>
                        <li>
                          <Link to="/users">Users</Link>
                        </li>
                        <li>
                          <Link to="/blogs">Blogs</Link>
                        </li>
                        <li>
                          <Link to="/archive">Archive</Link>
                        </li>
                      </ul>
                    </li>

                    <li onClick={() => setToggle(true)}>
                      <Link to="/createBlog">
                        <i className="bx bxs-message-square-detail"></i>
                        <span className="link_name">Write Blog</span>
                      </Link>
                    </li>

                    <li onClick={() => setToggle(true)}>
                      <Link to="/myBlog">
                        <i class="fas fa-id-card"></i>
                        <span className="link_name">My Blog</span>
                      </Link>
                    </li>
                  </>
                )}

                <li onClick={() => setToggle(true)}>
                  <Link to="/save">
                    <i className="bx bx-save"></i>
                    <span className="link_name">Favourite</span>
                  </Link>
                </li>

                {!auth && (
                  <li
                    onClick={() => {
                      setToggle(true);
                      signIn();
                    }}
                  >
                    <Link>
                      <i class="fas fa-sign-in-alt"></i>
                      <span className="link_name">LogIn</span>
                    </Link>
                  </li>
                )}

                <div className="profile-details">
                  {auth && (
                    <>
                      <div className="profile-content">
                        <img src={userImage} alt="profileImg" />
                      </div>
                      <div className="name-job">
                        <div className="profile_name">{userName}</div>
                      </div>
                      <i
                        className="bx bx-log-out"
                        style={{
                          color: "red",
                          paddingRight: "20px",
                          cursor: "pointer",
                          fontSize: "30px",
                        }}
                        onClick={signOut}
                      ></i>
                    </>
                  )}
                </div>
              </ul>
            </div>

            {/* home */}
            <section class="home-section">
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/createBlog">
                {auth ? (
                  <Blog user={userName} pic={userImage} />
                ) : (
                  <div className="signUp">
                    <h2>SignUp</h2>
                    <Button onClick={signIn}>Login to Continue...</Button>
                  </div>
                )}
              </Route>
              <Route path="/blog/:slug">
                <BlogPost />
              </Route>
              <Route path="/save">
                <Saved />
              </Route>
              <Route path="/edit/:slug">
                <Edit />
              </Route>
              <Route path="/remove/:slug">
                <Remove />
              </Route>
              <Route path="/myBlog">
                <MyBlog user={userName} />
              </Route>
              <Route path="/blogs">
                <Table />
              </Route>
              <Route path="/archive">
                <Archive />
              </Route>
            </section>

            <FirebaseAuthConsumer>
              {({ isSignedIn, user, providerId }) => {
                setAuth(isSignedIn);
              }}
            </FirebaseAuthConsumer>
          </div>
        </FirebaseAuthProvider>
      </Switch>
    </Router>
  );

  function signIn() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  }
  function signOut() {
    firebase.auth().signOut();
  }
  function toggler() {
    setToggle((prevState) => !prevState);
  }
}

export default App;
