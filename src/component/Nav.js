import {Link} from 'react-router-dom'
import {useState,useEffect}from 'react'
import { Name, Details, Profile,Text, Item, SlickBar, SidebarContainer, SideButton,Container} from './Sidebar'
import firebase from 'firebase'
import { Route } from 'react-router-dom'

const Nav = ({sign,auth,slide}) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => setprofileClick(!profileClick);


  const  [userName,setUserName] = useState("")
  const  [userImage,setUserImage] = useState("")

  useEffect(() => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const photoURL = user.photoURL;
    setUserName(displayName)
    setUserImage(photoURL)
  }
  },[auth])

 
  return (
    <div className="nav">
      <Route render={({ history }) => (
      <Container>
        <SideButton clicked={click} onClick={() => {
          handleClick()
          slide()}}>
          
        </SideButton>
        <SidebarContainer>
        
          <SlickBar clicked={click}>
            <Item
              onClick={() => setClick(false)}
              exact
              activeClassName="active"
              to="/home"
            >
              <Link to="/home">
              <svg viewBox="0 0 576 512" width="100" title="home">
                <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
              </svg>
              </Link>
              <Text clicked={click} onClick={() => { history.push('/home') }}>Home</Text>
            </Item>
            <Item
              onClick={() => setClick(false)}
              activeClassName="active"
              to="/createBlog"
            >
              <Link to="/createBlog">
              <svg viewBox="0 0 512 512" width="100" title="book-reader">
                <path d="M352 96c0-53.02-42.98-96-96-96s-96 42.98-96 96 42.98 96 96 96 96-42.98 96-96zM233.59 241.1c-59.33-36.32-155.43-46.3-203.79-49.05C13.55 191.13 0 203.51 0 219.14v222.8c0 14.33 11.59 26.28 26.49 27.05 43.66 2.29 131.99 10.68 193.04 41.43 9.37 4.72 20.48-1.71 20.48-11.87V252.56c-.01-4.67-2.32-8.95-6.42-11.46zm248.61-49.05c-48.35 2.74-144.46 12.73-203.78 49.05-4.1 2.51-6.41 6.96-6.41 11.63v245.79c0 10.19 11.14 16.63 20.54 11.9 61.04-30.72 149.32-39.11 192.97-41.4 14.9-.78 26.49-12.73 26.49-27.06V219.14c-.01-15.63-13.56-28.01-29.81-27.09z" />
              </svg>
                </Link>
                <Text clicked={click} onClick={() => { history.push('/createBlog') }}>Blog</Text>
            </Item>
            <Item
              onClick={() => setClick(false)}
              activeClassName="active"
              to="/save"
            >
              <Link to="/save">
              <svg viewBox="0 0 576 512" width="100" title="star">
                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
              </svg>
                </Link>
                  <Text clicked={click} onClick={() => { history.push('/save') }}> Saved</Text>
            </Item>

            <Item
              onClick={() => {
              setClick(false)
              sign()
            }
              }  
              activeClassName="active"
              to="/login"
            >
              <svg viewBox="0 0 640 512" width="100" title="user-clock">
                <path d="M496 224c-79.6 0-144 64.4-144 144s64.4 144 144 144 144-64.4 144-144-64.4-144-144-144zm64 150.3c0 5.3-4.4 9.7-9.7 9.7h-60.6c-5.3 0-9.7-4.4-9.7-9.7v-76.6c0-5.3 4.4-9.7 9.7-9.7h12.6c5.3 0 9.7 4.4 9.7 9.7V352h38.3c5.3 0 9.7 4.4 9.7 9.7v12.6zM320 368c0-27.8 6.7-54.1 18.2-77.5-8-1.5-16.2-2.5-24.6-2.5h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h347.1c-45.3-31.9-75.1-84.5-75.1-144zm-96-112c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128z" />
              </svg>
              <Text clicked={click} onClick={sign}>{auth ? "SignOut" : "SignIn"}</Text>
            </Item>
           
           
          </SlickBar>
          {auth &&
          <Profile clicked={profileClick}>
            <img
              onClick={() => handleProfileClick()}
              src={userImage}
              alt="Profile"
            />
            <Details clicked={profileClick}>
              <Name>
                <h4>{userName}</h4>
              </Name>

            </Details>
          </Profile>
}
        </SidebarContainer>
      </Container>
      )} />
    </div>
  );
};

export default Nav;
