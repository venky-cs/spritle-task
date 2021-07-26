import { useState} from 'react'
import Card from "./Card"
import { useDrop } from 'react-dnd'
import { useHistory} from 'react-router-dom'



const CardList = ({ blog, saveBlog }) => {
    const [drag, setDrag] = useState("")
    const [edit, setEdit] = useState("")

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "div",
        hover: (item) => editCard(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }))

    const editCard = (select) => {
        setEdit(select)
    }
    const history = useHistory();
    const goToEdit = () => history.push(`/edit/:${edit}`);
    const goToRemove = () => history.push(`/remove/:${edit}`);
   

    return (
        <>
            {blog.map((data, index) => (
                <Card data={data} saveBlog={saveBlog} isDrag={isDrag} />
            ))}
            {drag && <div className="dragged" ref={drop}>
                <div onDrop={goToEdit}>Edit </div>
                <div onDrop={goToRemove}>Remove</div>
            </div>}
        </>
    )

    function isDrag(drag) {
        setDrag(drag)
    }
}

export default CardList

