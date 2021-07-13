import Home from "./Home";
import Blog from "./Blog";
const Content = ({ page, auth }) => {
  return (
    <div className="content">
      {page === "home" && <Home />}
      {page === "blog" && (auth ? <Blog /> : "sign_in")}
    </div>
  );
};

export default Content;
