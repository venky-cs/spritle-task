import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";

const RenderCard = ({ filtered }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {filtered &&
        filtered.map((data, index) => (
          <div key={index} className="card">
            <Link to={"/blog/:" + data.title}>
              <h2>{data.title}</h2>
              <p>
                <ReactMarkdown>{data.message.substring(0, 450)}</ReactMarkdown>
              </p>
            </Link>
          </div>
        ))}
    </Masonry>
  );
};

export default RenderCard;
