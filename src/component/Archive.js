import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import RenderCard from "./RenderCard";

const Archive = () => {
  const [saved, setSaved] = useState();
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
        setSaved(datas);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    saved && setFiltered(saved.filter((data) => data.isSelect));
  }, [saved]);

  return (
    <div className="save">
      <h2 className="title">Archive Blog</h2>
      <RenderCard filtered={filtered} />
    </div>
  );
};

export default Archive;
