const Nav = ({setPage}) => {
  return (
    <div className="nav">
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("blog")}>Blog</button>
    </div>
  );
};

export default Nav;
