import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";

const Home = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    db.collection("post")
      .get()
      .then((snap) => {
        let datas = [];
        snap.forEach((doc) => {
          const data = doc.data();
          datas.push(data);
        });
        setBlog(datas);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {blog.map((data,index) => <div key={index}>
          <h2>{data.title}</h2>
          <p>{data.message}</p>
          <h5>{data.author}</h5>
      </div>)}
    </div>
  );
};

export default Home;
