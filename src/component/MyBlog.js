import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import RenderCard from "./RenderCard";
import { BottomScrollListener } from 'react-bottom-scroll-listener';


const MyBlog = ({ user }) => {
  const [myBlog, setMyBlog] = useState();
  const [lastDoc, setLastDoc] = useState([] | 15);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("post")
      .orderBy("created", "asc")
      .limit(15)
      .onSnapshot((snapshot) => {
        const lastDoc = snapshot.docs[snapshot.docs.length -1]
        setLastDoc(lastDoc);
        let datas = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id
          datas.push({ ...data, id: id });
          datas.filter(data => !data.isSelect)
        });
        setMyBlog(datas);
      }, (error) => {
        console.log(error)
      });

    return () => unsubscribe();
  }, []);

   const fetchMore = () => {
    db.collection("post")
      .orderBy("created", "asc")
      .startAfter(lastDoc)
      .limit(15)
      .onSnapshot((snapshot) => {
        let datas = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id
          datas.push({ ...data, id: id });
          datas.filter(data => !data.isSelect)
        });
        const lastDoc = snapshot.docs[snapshot.docs.length -1]
        setLastDoc(lastDoc);
        setMyBlog((blog) => [...blog].concat(datas));
      }, (error) => {
        console.log(error)
      });
  };

  useEffect(() => {
    myBlog && setFiltered(myBlog.filter((data) => data.author === user));
  }, [myBlog]);

  return (
    <div className="save">
      <h2 className="title">My Blog</h2>
      <RenderCard filtered={filtered} />
        <BottomScrollListener onBottom={fetchMore} />
    </div>
  );
};

export default MyBlog;
