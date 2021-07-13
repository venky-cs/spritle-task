import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useState, useEffect } from "react";
const CustomRating = ({ count, select }) => {
  const [rating, setRating] = useState(select);
  const [state, setState] = useState([]);

  const styles = {
    starStyle: {
      color: "orange",
    },
  };

  useEffect(() => {
    setState([...Array(count)]);
  }, [select,count]);

  return (
    <div style={styles.starStyle}>
      <h2>Rating {rating}</h2>
      {console.log(state)}
      {state.map((count, index) =>
        index < rating ? (
          <IoIosStar key={index} onClick={() => setRating(index + 1)} />
        ) : (
          <IoIosStarOutline key={index} onClick={() => setRating(index + 1)} />
        )
      )}
    </div>
  );
};

export default CustomRating;
