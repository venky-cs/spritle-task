import { useDragLayer, useDragDropManager } from 'react-dnd'

export default function DragLayerComponent(props) {
    const collectedProps = useDragLayer(
        monitor => props
    )
    const dragDropManager = useDragDropManager()
    console.log(collectedProps)
    console.log(dragDropManager)
    return <div>
        {props.children}
    </div>

}