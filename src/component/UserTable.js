import { useState, useEffect, useMemo } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { db } from "../firebaseConfig";
import { USER_COLUMNS } from "./UserColumns";
import "./table.css";
import Button from "./Button";
import { Checkbox } from "./Checkbox";

const Table = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        db.collection("user").onSnapshot(
            (snapshot) => {
                let datas = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const img = data.img;
                    datas.push({
                        ...data,
                        img: <img src={img} alt="pic" />,
                    });
                });
                const unique = Array.from(new Set(datas.map(a => a.uid)))
                    .map(uid => {
                        return datas.find(a => a.uid === uid)
                    })
                setUser(unique);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);


    const columns = useMemo(() => USER_COLUMNS, []);
    // const data = useMemo(() => blog,[])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        selectedFlatRows,
    } = useTable(
        {
            columns,
            data: user,
        },
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
                },
                ...columns,
            ]);
        }
    );

    const { pageIndex, pageSize } = state;

    return (
        <div>
            <h3 className="title">Users</h3>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            aria-label={cell.column.Header}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <div className="table-options">
                <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    {[5, 10, 15, 25].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <Button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
                    {"<<"}
                </Button>
                <Button disabled={!canPreviousPage} onClick={() => previousPage()}>
                    previous
                </Button>
                <Button disabled={!canNextPage} onClick={() => nextPage()}>
                    next
                </Button>
                <Button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
                    {">>"}
                </Button>
            </div>
        </div>
    );

};

export default Table;
