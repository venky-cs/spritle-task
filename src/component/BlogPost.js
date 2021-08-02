import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ContentLoader from "react-content-loader";
import { db } from "../firebaseConfig";
import Button from "./Button";
import dayjs from 'dayjs';


function BlogPost() {
  const [blog, setBlog] = useState([]);
  const [select, setSelect] = useState();
  const [status, setStatus] = useState("");


  let { slug } = useParams();
  slug = JSON.stringify(slug.slice(1));

  useEffect(() => {
    db.collection("post").onSnapshot(
      (snapshot) => {
        let datas = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          datas.push({ ...data, id: id });
        });
        setBlog(datas);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    setSelect(blog.filter((data) => data.title === JSON.parse(slug)));
  }, [blog, slug]);

  function dateAgo(createdDate) {
    let today = Math.floor(new Date().getTime() / 1000)
    let formatToday = dayjs.unix(today).format('YYYY-MM-DD')
    let calculate = dayjs.unix(createdDate).format('YYYY-MM-DD')
    formatToday = dayjs(formatToday)
    calculate = dayjs(calculate)
    let result = formatToday.diff(calculate, 'day', true)
    return result
  }

  return (
    <div>
      {!select ? (
        <ContentLoader viewBox="0 0 820 450" height={450} width={820}>
          <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
          <rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
          <rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
          <rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
          <rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
          <rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
        </ContentLoader>
      ) : (
        select.map((data, index) => (
          <div key={index} className="select">
            <div key={index} className="card full">
              <div className="btn">
                <h2>{data.title}</h2>
                <div onClick={shareBlog}>
                  <i class="fas fa-share"></i>
                  <p>
                    {status ? <span>{status}</span> : "Share"}
                  </p>
                </div>
              </div>
              <br />
              <p>
                <ReactMarkdown>{data.message}</ReactMarkdown>
              </p>
              <div className="btn">
                <div>
                  <div className="user-info">
                    <img src={data.profile} alt="profile" />
                    <h4>{data.author}</h4>
                  </div>
                  <div>
                    <p className="days">{dateAgo(data.created) !== 0 && dateAgo(data.created) + " days ago"} </p>
                  </div>
                </div>

                {data.views && <p> <i class="fas fa-eye">{"  " + data.views}</i></p>}

                <i
                  className={data.isSaved ? "fas fa-bookmark" : "far fa-bookmark"}
                  onClick={() => saveBlog(data)}
                ></i>
              </div>
            </div>
          </div>
        ))
      )
      }
    </div >
  );

  function saveBlog(data) {
    db.collection("post").doc(data.id).update({ isSaved: !data.isSaved });
  }
  function shareBlog() {
    let url = document.URL
    console.log(url)
    navigator.clipboard.writeText(url);
    const successful = document.execCommand("copy");
    if (successful) {
      setStatus("Copied!");
    } else {
      setStatus("Unable to copy!");
    }
    console.log(status);
  }


}

export default BlogPost;
