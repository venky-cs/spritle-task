import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import ContentLoader from "react-content-loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardList from "./CardList";
// import dayjs from 'dayjs';

const width = 7;
const height = 3;
const foregroundColor = "#F0F1F4";
const backgroundColor = "#F9F9FA";

const Home = () => {
  const [blog, setBlog] = useState([]);
  // const [lastDoc, setLastDoc] = useState([] | 15);

  useEffect(() => {
    const unsubscribe = db.collection("post")
      .orderBy("created", "asc")
      // .limit(15)
      .onSnapshot((snapshot) => {
        const lastDoc = snapshot.docs[snapshot.docs.length -1]
        // setLastDoc(lastDoc);
        let datas = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id
          datas.push({ ...data, id: id });
          datas.filter(data => !data.isSelect)
        });
        setBlog(datas);
      }, (error) => {
        console.log(error)
      });

    return () => unsubscribe();
  }, []);


  // const fetchMore = () => {
  //   db.collection("post")
  //     .orderBy("created", "asc")
  //     .startAfter(lastDoc)
  //     .limit(15)
  //     .onSnapshot((snapshot) => {
  //       let datas = [];
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         const id = doc.id
  //         datas.push({ ...data, id: id });
  //         datas.filter(data => !data.isSelect)
  //       });
  //       const lastDoc = snapshot.docs[snapshot.docs.length -1]
  //       setLastDoc(lastDoc);
  //       setBlog((blog) => [...blog].concat(datas));
  //     }, (error) => {
  //       console.log(error)
  //     });
  // };


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="home">
        <h1 className="title">Home Page</h1>
        <div className="box">
          {blog.length < 1 ? (
            <div>
              <ContentLoader
                foregroundColor={foregroundColor}
                backgroundColor={backgroundColor}
                style={{ width: "100%", height: 93 * height }}
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
            <CardList blog={blog} saveBlog={saveBlog} />
          )}
        </div>
        {/* <BottomScrollListener onBottom={fetchMore} /> */}
      </div>
    </DndProvider>
  );

  function saveBlog(data) {
    db.collection("post").doc(data.id).update({ isSaved: !data.isSaved });
  }
};

export default Home;
