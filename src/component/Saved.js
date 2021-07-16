import {useState,useEffect,useContext } from "react"
import {saveContext} from '../context/SaveContext'
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';
import Button from './Button'

const Saved = () => {
    const value = useContext(saveContext)
    const [save] = value
// const save= localStorage.getItem('save')
const [saved,setSaved] = useState()

useEffect(() => {
    // let store = save && save.split(",")
    // let saves = removeDuplicate(store)
    setSaved(save)
    // console.log(saved)
},[save])
    return (
        <div>
            <h2>Saved Blog</h2>
            <Button><Link to="/">Back</Link></Button>
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

    // function removeDuplicate(arr){
    //     return [...new Set(arr)]
    // }
}

export default Saved
