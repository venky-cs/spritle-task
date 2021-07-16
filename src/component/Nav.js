import {Link} from 'react-router-dom'
import Button from './Button'
const Nav = () => {
  return (
    <div className="nav">
      <Button variant="default" 
      // onClick={() => setPage("home")}
      >
        <Link to="/home">Home</Link></Button>
      <Button variant="default"
      //  onClick={() => setPage("blog")}
       ><Link to="/createBlog">Blog</Link></Button>
      <Button variant="default">
      <Link to="/save">Saved</Link>
      </Button>
    </div>
  );
};

export default Nav;
