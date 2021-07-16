import React, { createContext, useState,useEffect} from 'react';

export const saveContext = createContext();

export default function SaveContext(props) {
    // const [save, setSave] = useState(localStorage.getItem("store"));
    const [save, setSave] = useState([]);
    const [blog, setBlog] = useState([])
    // console.log(save)
    // console.log(blog)

    useEffect(() => {
        localStorage.setItem("save",JSON.stringify(save))
        let a = localStorage.getItem("save")
        let b = JSON.parse(a)
        setBlog(b)
    },[save])
    return (
        <saveContext.Provider value={[blog, setSave]}>
            {props.children}
        </saveContext.Provider>
    );
}
