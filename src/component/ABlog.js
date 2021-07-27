import {useState,useEffect,useMemo} from 'react'
import {useTable} from 'react-table'
import { db } from "../firebaseConfig";
import {COLUMNS} from './Columns';
import dayjs from 'dayjs';
import './table.css'

const ABlog = () => {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        db.collection("post")
            .onSnapshot((snapshot) => {
                let datas = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id
                    datas.push({ ...data, created: dayjs.unix(data.created).format('DD-MM-YYYY'),id:id });
                });
                setBlog(datas);
            }, (error) => {
                console.log(error)
            });
    }, []);


    const columns = useMemo(() => COLUMNS,[])
    // const data = useMemo(() => blog,[])

    const tableInstance = useTable({
        columns,
        data:blog
    })

    console.log(blog)

    const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = tableInstance

    return (
        <div>
            <h3 className="title">Blogs</h3>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                    }
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ABlog
