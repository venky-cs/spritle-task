import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useDrag } from "react-dnd"

const Card = ({ data, saveBlog, isDrag }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: { id: data.id, },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }))

    useEffect(() => {
        isDrag(isDragging)
    }, [isDragging])

    return (
        <div className="card" key={data.id} ref={drag}>
            <Link to={"/blog/:" + data.title}>
                <h2>{data.title}</h2>
                <p>
                    <ReactMarkdown>{data.message
                    .substring(0, 250)
                    }</ReactMarkdown>
                </p>
            </Link>
            <div className="btn">
                <div className="user-info">
                    <img src={data.profile} alt="profile" />
                    <span>{data.author}</span>
                </div>

                <i className={data.isSaved ? "fas fa-bookmark" : "far fa-bookmark"} onClick={() => saveBlog(data)}></i>

            </div>
            {/* <p>{dayjs.unix(data.created).format('YYYY-MM-DD')}</p> */}
        </div>
    )
}

export default Card
