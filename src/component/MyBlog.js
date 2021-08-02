import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import RenderCard from "./RenderCard";

const MyBlog = ({ user }) => {
  const [myBlog, setMyBlog] = useState();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    db.collection("post")
      .get()
      .then((snap) => {
        let datas = [];
        snap.forEach((doc) => {
          const data = doc.data();
          datas.push(data);
        });
        setMyBlog(datas);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    myBlog && setFiltered(myBlog.filter((data) => data.author === user));
  }, [myBlog]);

  return (
    <div className="save">
      <h2 className="title">My Blog</h2>
      <RenderCard filtered={filtered} />
    </div>
  );
};

export default MyBlog;
