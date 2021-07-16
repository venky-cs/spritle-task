import {Link} from 'react-router-dom'
const Nav = ({setPage}) => {
  return (
    <div className="nav">
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("blog")}>Blog</button>
      <button>
      <Link to="/save">Saves</Link>
      </button>
    </div>
  );
};

export default Nav;
