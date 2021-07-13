import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import ContentLoader from "react-content-loader";


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
    <div className="home">
      <h1 className="title">Home Page</h1>
      <div className="box">
        {blog.length < 1 ? (
          <ContentLoader
            viewBox="0 0 820 450"
            height={450}
            width={820}
          >
            <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
            <rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
            <rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
            <rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
            <rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
            <rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
          </ContentLoader>
        ) : (
          blog.map((data, index) => (
            <div key={index} className="card">
              <h2>{data.title}</h2>
              <p>{data.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
