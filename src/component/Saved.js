import {useState,useEffect,useContext } from "react"
import {saveContext} from '../context/SaveContext'
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';


const Saved = () => {
    const value = useContext(saveContext)
    const [save] = value
const [saved,setSaved] = useState()

useEffect(() => {
    setSaved(save)
},[save])
    return (
        <div className="save">
            <h2 className="title">Saved Blog</h2>
            <div className="box">
                { saved &&
                    saved.map((data, index) => (
                        <div key={index} className="card">
                            <Link to={"/blog/:" + data.title}>
                                <h2>{data.title}</h2>
                                <p>
                                    <ReactMarkdown>{data.message.substring(0, 250)}</ReactMarkdown>
                                </p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default Saved
