import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardList from "./CardList";
import Grid from "./ContentLoader";
import { BottomScrollListener } from 'react-bottom-scroll-listener'

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [drag, setDrag] = useState("");
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [lastDoc, setLastDoc] = useState();



  useEffect(() => {
    const unsubscribe = db
      .collection("post")
      .orderBy("created", "asc")
      .limit(12)
      .onSnapshot(
        (snapshot) => {
          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          setLastDoc(lastDoc);
          let datas = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            datas.push({ ...data, id: id });
            datas.filter((data) => !data.isSelect);
          });
          setBlog(datas);
        },
        (error) => {
          console.log(error);
        }
      );

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
        const lastDoc = snapshot.docs[snapshot.docs.length - 1]
        setLastDoc(lastDoc);
        setBlog((blog) => datas, blog);
      }, (error) => {
        console.log(error)
      });
  };

  useEffect(() => {
    search &&
      setFiltered(
        blog.filter((data) => data.title.toLowerCase().includes(search.toLowerCase()))
      );
  }, [search]);

  console.log(filtered);

  const searchBlog = (e) => {
    const searched = e.target.value
    setSearch(searched);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="home">
        <h1 className="title">Home Page</h1>

        <div className="search">
          <input
            type="text"
            value={search}
            onChange={searchBlog}
            placeholder="search blog"
          />

        </div>

        <div className="box" style={{ opacity: drag ? 0.5 : 1 }}>
          {blog.length < 1 ? (
            <Grid />
          ) : (
            <CardList
              blog={
                search && filtered && filtered.length > 1 ? filtered : blog
              }
              saveBlog={saveBlog}
              checkDrag={checkDrag}
            />
          )}
        </div>

        <div className="btn">
          <button className="pg" onClick={() => {
            setLastDoc(prev => prev - 12)
            fetchMore()
            window.scrollTo(0, 0)
          }}>{"<<"} Previous</button>

          <button className="pg" onClick={
            () => {
              fetchMore()
              window.scrollTo(0, 0)
            }
          }>Next {">>"}</button>
        </div>
      </div>
    </DndProvider>
  );

  function saveBlog(data) {
    db.collection("post").doc(data.id).update({ isSaved: !data.isSaved });
  }

  function checkDrag(drag) {
    setDrag(drag);
  }
};

export default Home;
