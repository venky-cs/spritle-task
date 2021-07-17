import { useState, useEffect,useContext } from "react";
import { db } from "../firebaseConfig";
import ContentLoader from "react-content-loader";
import ReactMarkdown from "react-markdown";
import {Link} from 'react-router-dom'
import {saveContext} from '../context/SaveContext'

const Home = () => {
  const [blog, setBlog] = useState([]);
  const values = useContext(saveContext)
  const [save, ,setLoad] = values

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
                <ContentLoader viewBox="0 0 820 450" height={450} width={820}>
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
                      <p>
                        <ReactMarkdown>{data.message.substring(0, 250)}</ReactMarkdown>
                      </p>
                    <div className="btn">
                        <Link to={"/blog/:" + data.title}>
                        <img src="https://img.icons8.com/ios-filled/50/000000/open-book.png" alt="i"
                        />
                        </Link>

                        <img src="https://img.icons8.com/ios-filled/50/000000/save--v2.png" onClick={() => saveData(data)} alt="save"/>

                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
  );

  function saveData(data) {
    let a = JSON.parse(localStorage.getItem("save"))
    let b =a && a.length > 0 && a.every(a => a.title !== data.title)
    if (b === false) {
      alert("Already Saved")
    } else {
      localStorage.setItem(
        'save',
        JSON.stringify([
          ...save,
          { title: data.title, message: data.message, },
        ])
      );
      setLoad(prevState => !prevState)
    }
  }
};

export default Home;
