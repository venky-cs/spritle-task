import { useState, useEffect} from "react";
import { db } from "../firebaseConfig";
import ContentLoader from "react-content-loader";
import ReactMarkdown from "react-markdown";
import {Link} from 'react-router-dom'


const width = 7
const height = 3
const foregroundColor = '#F0F1F4'
const backgroundColor = '#F9F9FA'

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [load,setLoad] =useState(false)

  useEffect(() => {
    db.collection("post")
      .get()
      .then((snap) => {
        let datas = [];
        snap.forEach((doc) => {
          const data = doc.data();
          const id =doc.id
          datas.push({...data,id:id,data:data});
        });
        setBlog(datas);
      })
      .catch((err) => console.log(err));
  }, [load]);

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

                       <i className={data.isSaved ? "fas fa-bookmark" : "far fa-bookmark"} onClick={() => saveBlog(data)}></i> 

                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
  );

  function saveBlog(data){
  db.collection("post").doc(data.id).update({isSaved:!data.isSaved})
  setLoad(prevState => !prevState)
  }

  
};

export default Home;
