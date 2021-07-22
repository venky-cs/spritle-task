import { useState, useEffect, useContext } from "react";
import { db } from "../firebaseConfig";
import ContentLoader from "react-content-loader";
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom'
import { saveContext } from '../context/SaveContext'


const width = 7
const height = 3
const foregroundColor = '#F0F1F4'
const backgroundColor = '#F9F9FA'

const Home = () => {
  const [blog, setBlog] = useState([]);
  const values = useContext(saveContext)
  const [save, , setLoad] = values
  let a = JSON.parse(localStorage.getItem("save"))
  let b = 0;
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
          <div>
            <ContentLoader
              foregroundColor={foregroundColor}
              backgroundColor={backgroundColor}
              style={{ width: '100%', height: 93 * height }}
            >

              <rect
                x="0"
                y={height * 17}
                rx="8"
                ry="8"
                width={width * 70}
                height={height * 76}
              />
              <rect
                x={width * 78}
                y={height * 17}
                rx="8"
                ry="8"
                width={width * 70}
                height={height * 76}
              />

            </ContentLoader>
          </div>
        ) : (
          blog.map((data, index) => (
            <div key={index} className="card">

              <h2>{data.title}</h2>
              <p>
                <ReactMarkdown>{data.message.substring(0, 250)}</ReactMarkdown>
              </p>
              <div className="btn">
                <Link to={"/blog/:" + data.title}>
                  <i class="fas fa-book-reader"></i>
                </Link>

                {
                  b = a && a.length > 0 && a.every(a => a.title !== data.title)
                    ? <i className="far fa-bookmark" onClick={() => saveData(data)}></i> :
                    a && a.length > 0 ?
                      <i className="fas fa-bookmark" onClick={() => saveData(data)}></i>
                      : <i className="far fa-bookmark" onClick={() => saveData(data)}></i>
                }

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  function saveData(data) {
    let a = JSON.parse(localStorage.getItem("save"))
    let b = a && a.length > 0 && a.every(a => a.title !== data.title)
    let c = Array(data.title)

    if (a && a.length > 0 && b === false) {
      let remove = a.length > 0 && a.filter(item => !c.includes(item.title))
      console.log(remove)
      localStorage.setItem(
        'save',
        JSON.stringify(
          remove
        )
      );
      setLoad(prevState => !prevState)
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
