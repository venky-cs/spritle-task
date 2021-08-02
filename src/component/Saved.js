import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import RenderCard from "./RenderCard";

const Saved = () => {
  const [saved, setSaved] = useState();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("post").onSnapshot(
      (snapshot) => {
        let datas = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          datas.push({ ...data, id: id });
          datas.filter((data) => !data.isSelect);
        });
        setSaved(datas);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    saved && setFiltered(saved.filter((data) => data.isSaved));
  }, [saved]);

  return (
    <div className="save">
      <h2 className="title">Saved Blog</h2>
      <RenderCard filtered={filtered} />
    </div>
  );
};

export default Saved;
