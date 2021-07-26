import { useState, useEffect} from "react"
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';
import { db } from "../firebaseConfig";
import Masonry from 'react-masonry-css'

const Saved = () => {

    const [saved, setSaved] = useState()
    const[filtered,setFiltered]  =useState([])


    useEffect(() => {
        db.collection("post")
            .get()
            .then((snap) => {
                let datas = [];
                snap.forEach((doc) => {
                    const data = doc.data();
                    datas.push(data);
                });
                setSaved(datas);
            })
            .catch((err) => console.log(err));
           
    }, []);

    useEffect(() => {
        saved && setFiltered(saved.filter((data) => data.isSaved))
    },[saved])

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 2,
        500: 1
    };

    return (
        <div className="save">
            <h2 className="title">Saved Blog</h2>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {filtered &&
                    filtered.map((data, index) => (
                        <div key={index} className="card">
                            <Link to={"/blog/:" + data.title}>
                                <h2>{data.title}</h2>
                                <p>
                                    <ReactMarkdown>{data.message.substring(0, 350)}</ReactMarkdown>
                                </p>
                            </Link>
                        </div>
                    ))
                }
            </Masonry>
        </div>
    )

}

export default Saved
