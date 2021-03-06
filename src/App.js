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
import UserTable from "./component/UserTable";
import { db } from "./firebaseConfig";
import { useSelector, useDispatch } from 'react-redux'
import { openMenu, closeMenu } from './redux/actions'
require("dotenv").config();


function App() {

  const store = useSelector(state => state)
  const dispatch = useDispatch()
  console.log(store)
  const [auth, setAuth] = useState(false);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);

  const [toggle, setToggle] = useState(store);
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

  const user = firebase.auth().currentUser;



  useEffect(() => {
    db.collection("user").onSnapshot(
      (snapshot) => {
        let datas = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          datas.push({ ...data });
        });
        setUsers(datas);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    user && console.log(user.email);
    let check =
      user && user.email && users.every((users) => users.email !== user.email);
    if (check) {
      db.collection("user").add({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        img: user.photoURL,
        mobile: user.phoneNumber,
      });
    } else console.log("user already exist");
  }, [store]);

  return (
    <Router>
      <Switch>
        <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
          <div className="app">
            {/* sidebar */}
            <div className={`sidebar ${store && "close"}`}>
              <div className="logo-details" onClick={toggler}>
                <i className="bx bx-menu"></i>
                <span className="logo_name">Blog App</span>
              </div>

              <ul className="nav-links">
                <li onClick={() => dispatch(openMenu())}>
                  <Link to="/home">
                    <i className="bx bx-home"></i>
                    <span className="link_name">Home</span>
                  </Link>
                </li>

                {auth && admin && (
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
                          <Link to="/admin/users">Users</Link>
                        </li>
                        <li>
                          <Link to="/admin/blogs">Blogs</Link>
                        </li>
                      </ul>
                    </li>
                  </>
                )}

                {auth && (
                  <>
                    <li onClick={() => dispatch(openMenu())}>
                      <Link to="/createBlog">
                        <i className="bx bxs-message-square-detail"></i>
                        <span className="link_name">Write Blog</span>
                      </Link>
                    </li>

                    <li onClick={() => dispatch(openMenu())}>
                      <Link to="/myBlog">
                        <i class="fas fa-id-card"></i>
                        <span className="link_name">My Blog</span>
                      </Link>
                    </li>
                  </>
                )}

                <li onClick={() => dispatch(openMenu())}>
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
                {auth ? (
                  <MyBlog user={userName} />
                ) : (
                  <div className="signUp">
                    <h2>SignUp</h2>
                    <Button onClick={signIn}>Login to Continue...</Button>
                  </div>
                )}
              </Route>
              {admin && (
                <>
                  <Route path="/admin/blogs">
                    {admin ? (
                      <Table />
                    ) : (
                      <div className="signUp">
                        <h2>Admin Page</h2>
                      </div>
                    )}
                  </Route>
                  <Route path="/admin/users" exact>
                    {admin ? (
                      <UserTable />
                    ) : (
                      <div className="signUp">
                        <h2>Admin Page</h2>
                      </div>
                    )}
                  </Route>
                </>
              )}
            </section>

            <FirebaseAuthConsumer>
              {({ isSignedIn, user, providerId }) => {
                setAdmin(false);
                setAuth(isSignedIn);
                let email = "rashid.tv@spritle.com";
                user && user.email === email && setAdmin(true);
                let email2 = "venky22ii1997@gmail.com";
                user && user.email === email2 && setAdmin(true);
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
    !store && dispatch(openMenu())
    store && dispatch(closeMenu())
  }
}

export default App;
