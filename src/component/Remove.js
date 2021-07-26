import { useState, useEffect } from "react"
import { useParams, useHistory } from 'react-router-dom'
import { db } from "../firebaseConfig";

const Remove = () => {

    const [blog, setBlog] = useState()
    const [filtered, setFiltered] = useState([])


    useEffect(() => {
        db.collection("post")
            .get()
            .then((snap) => {
                let datas = [];
                snap.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id
                    datas.push({ ...data, id: id });
                });
                setBlog(datas);
            })
            .catch((err) => console.log(err));

    }, []);

    let { slug } = useParams();
    slug = JSON.stringify(slug.slice(1))

    useEffect(() => {
        blog && setFiltered(blog.filter((data) => data.id === JSON.parse(slug)))
    }, [blog])

    console.log(filtered)


    const history = useHistory();
    const goToHome = () => history.push(`/home`);

    return (
        <div className="popUp">
            <div className="card">
                {filtered && filtered.map(data =>
                    <>
                        <h3>Are you sure to delete this {data.title} blog ?</h3>
                       
                        <button onClick={deleteBlog}>Yes</button>
                        <button onClick={backToHome}>No</button>
                    </>
                )
                }
            </div>
        </div>
    )
    function deleteBlog(){
        let id =JSON.parse(slug)
        db.collection('post').doc(id).delete()
        goToHome()
    }
    function backToHome(){
        goToHome()
    }
}

export default Remove
