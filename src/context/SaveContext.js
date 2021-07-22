import React, { createContext, useState, useEffect } from 'react';

export const saveContext = createContext();

export default function SaveContext(props) {

    const [blog, setBlog] = useState([])
    const [load, setLoad] = useState(false)


    let data = JSON.parse(localStorage.getItem('save')) || [];

    useEffect(() => {
        setBlog(data)
    }, [load])
    return (
        <saveContext.Provider value={[blog, setBlog, setLoad]}>
            {props.children}
        </saveContext.Provider>
    );
}
