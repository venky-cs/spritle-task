import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import ContentLoader from "react-content-loader";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import CardList from "./CardList";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
// import dayjs from 'dayjs';


const width = 7
const height = 3
const foregroundColor = '#F0F1F4'
const backgroundColor = '#F9F9FA'

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [lastDoc, setLastDoc] = useState([] | 15)

  useEffect(() => {
    db.collection("post").orderBy("created", "asc").limit(15).onSnapshot((collection) => {
      let datas = collection.docs.map(blog => ({ ...blog.data(), id: blog.id }))
      const lastDoc = collection.docs[collection.docs.length - 1]
      datas.filter(data => !data.isSelect)
      setBlog(datas)
      setLastDoc(lastDoc)
    })
  }, [])


  const fetchMore = () => {
    db.collection("post").orderBy("created", "asc").startAfter(lastDoc).limit(15).get()
      .then(collection => {
        let datas = collection.docs.map(blog => ({ ...blog.data(), id: blog.id }))
        const lastDoc = collection.docs[collection.docs.length - 1]
        setBlog((blog) => [...blog].concat(datas))
        setLastDoc(lastDoc)
      })
  }

  const scrollRef = useBottomScrollListener(fetchMore, 0, 200, undefined, true);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="home">
        <h1 className="title">Home Page</h1>
        <div className="box">
          {blog.length < 1 ? (
            <div >
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
          ) : <CardList blog={blog} saveBlog={saveBlog} ref={scrollRef} />}
        </div>
      </div>
    </DndProvider>
  );

  function saveBlog(data) {
    db.collection("post").doc(data.id).update({ isSaved: !data.isSaved })
  }

};

export default Home;
