import {Link} from 'react-router-dom'
import Button from './Button'
const Nav = ({setPage}) => {
  return (
    <div className="nav">
      <Button variant="default" onClick={() => setPage("home")}>Home</Button>
      <Button variant="default" onClick={() => setPage("blog")}>Blog</Button>
      <Button variant="default">
      <Link to="/save">Saves</Link>
      </Button>
    </div>
  );
};

export default Nav;
