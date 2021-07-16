import React, { createContext, useState,useEffect} from 'react';

export const saveContext = createContext();

export default function SaveContext(props) {

    const [blog, setBlog] = useState([])


    let data = JSON.parse(localStorage.getItem('save')) || [];

    useEffect(() => {
        setBlog(data)
    },[data])
    return (
        <saveContext.Provider value={[blog, setBlog]}>
            {props.children}
        </saveContext.Provider>
    );
}
