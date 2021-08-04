import { useState, useEffect, useMemo } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { db } from "../firebaseConfig";
import { COLUMNS } from "./Columns";
import dayjs from "dayjs";
import "./table.css";
import Button from "./Button";
import { useHistory } from "react-router-dom";
import { Checkbox } from "./Checkbox";

const Table = () => {
  const [blog, setBlog] = useState([]);
  const [filterArchive, setFilterArchive] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    db.collection("post").onSnapshot(
      (snapshot) => {
        let datas = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          datas.push({
            ...data,
            created: dayjs.unix(data.created).format("DD-MM-YYYY"),
            id: id,
          });
          setBlog(datas);
          let filterArchive = datas.filter((data) => !data.isSelect);
          setFilterArchive(filterArchive);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    blog && setFiltered(blog.filter((data) => data.isSelect));
  }, [load]);

  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => blog,[])

  const history = useHistory();

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
      data: load ? filtered : filterArchive,
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
      <h3 className="title">Blogs</h3>
      <div className="table-edit">
        {selectedFlatRows && selectedFlatRows.length === 1 ? (
          <div onClick={editBlog}>
            <i class="fas fa-edit"></i>
            <p>Edit</p>
          </div>
        ) : (
          <th></th>
        )}

        {!load ? (
          <div onClick={() => setLoad((prev) => !prev)}>
            <i class="fas fa-filter"></i>
            <p>Archived</p>
          </div>
        ) : (
          <div onClick={() => setLoad((prev) => !prev)}>
            <p>All</p>
            <i class="fas fa-warehouse"></i>
          </div>
        )}

        <div onClick={removeBlog}>
          <i class="fas fa-trash"></i>
          <p>Remove</p>
        </div>
        <div onClick={archiveBlog}>
          <i class="fas fa-archive"></i>
          <p>Archive</p>
        </div>
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            </>
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
  function editBlog() {
    selectedFlatRows.map((data) => {
      let id = data.values.id;
      history.push(`/edit/:${id}`);
    });
  }

  function removeBlog() {
    selectedFlatRows.map((data) => {
      let id = data.values.id;
      db.collection("post").doc(id).delete();
    });
  }

  function archiveBlog() {
    selectedFlatRows.map((data) => {
      let id = data.values.id;
      db.collection("post").doc(id).update({ isSelect: true });
    });
  }
};

export default Table;
