import { useState } from "react";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import Masonry from "react-masonry-css";

const CardList = ({ blog, saveBlog }) => {
  const [drag, setDrag] = useState("");
  const [edit, setEdit] = useState("");

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    hover: (item) => editCard(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const editCard = (select) => {
    setEdit(select);
  };
  const history = useHistory();
  const goToEdit = () => history.push(`/edit/:${edit}`);
  const goToRemove = () => history.push(`/remove/:${edit}`);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
    500: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {blog &&
          blog.map((data, index) => (
            <Card data={data} saveBlog={saveBlog} isDrag={isDrag} />
          ))}
      </Masonry>
      {drag && (
        <div className="dragged" ref={drop} >
          <div onDrop={goToEdit}>Edit </div>
          <div onDrop={goToRemove}>Remove</div>
        </div>
      )}
    </>
  );

  function isDrag(drag) {
    setDrag(drag);
  }
};

export default CardList;
