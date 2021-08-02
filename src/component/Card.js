import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDrag } from "react-dnd";
import dayjs from 'dayjs';
import { db } from "../firebaseConfig";


const Card = ({ data, saveBlog, isDrag }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { id: data.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    isDrag(isDragging);
  }, [isDragging]);

  function dateAgo(createdDate) {
    let today = Math.floor(new Date().getTime() / 1000)
    let formatToday = dayjs.unix(today).format('YYYY-MM-DD')
    let calculate = dayjs.unix(createdDate).format('YYYY-MM-DD')
    formatToday = dayjs(formatToday)
    calculate = dayjs(calculate)
    let result = formatToday.diff(calculate, 'day', true)
    return result
  }

  return (

    <div className="card" key={data.id} ref={drag} style={{ opacity: isDragging ? 0 : 1 }}>
      <Link to={"/blog/:" + data.title} onClick={() => updateViewCount(data.id)}>
        <h2>{data.title}</h2>
        <p>
          <ReactMarkdown>{data.message.substring(0, 350)}</ReactMarkdown>
        </p>
      </Link>
      <div className="btn">
        <div>
          <div className="user-info">
            <img src={data.profile} alt="profile" />
            <h4>{data.author}</h4>
          </div>
          <div>
            <p className="days">{dateAgo(data.created) !== 0 && dateAgo(data.created) + " days ago"} </p>
          </div>
        </div>

        <i
          className={data.isSaved ? "fas fa-bookmark" : "far fa-bookmark"}
          onClick={() => saveBlog(data)}
        ></i>
      </div>

    </div>

  );

  function updateViewCount(id) {
    let Id = id
    console.log(Id)
    console.log(data)
    if (!data.views) {
      console.log(data.views)
      db.collection("post").doc(Id).update({
        views: 1
      });
    } else
      db.collection("post").doc(Id).update({
        views: data.views + 1
      });
    console.log(data)
  }
};

export default Card;
