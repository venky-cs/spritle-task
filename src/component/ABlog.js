import { useState, useEffect, useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import { db } from "../firebaseConfig";
import { COLUMNS } from './Columns';
import dayjs from 'dayjs';
import './table.css'
import Button from './Button'

const ABlog = () => {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        db.collection("post")
            .onSnapshot((snapshot) => {
                let datas = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id
                    datas.push({ ...data, created: dayjs.unix(data.created).format('DD-MM-YYYY'), id: id });
                });
                setBlog(datas);
            }, (error) => {
                console.log(error)
            });
    }, []);


    const columns = useMemo(() => COLUMNS, [])
    // const data = useMemo(() => blog,[])


    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, prepareRow, pageOptions, state, gotoPage, pageCount,setPageSize } = useTable({
        columns,
        data: blog
    }, usePagination)

    const { pageIndex,pageSize } = state

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
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td aria-label={cell.column.Header} {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
            <div className="table-options">
                <span>Page {' '}
                    <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                </span>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {[5,10,15,25].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                        </option>
                    ))}
                </select>
                <Button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>{'<<'}</Button>
                <Button disabled={!canPreviousPage} onClick={() => previousPage()}>previous</Button>
                <Button disabled={!canNextPage} onClick={() => nextPage()}>next</Button>
                <Button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>{'>>'}</Button>
            </div>
        </div>
    )
}

export default ABlog
