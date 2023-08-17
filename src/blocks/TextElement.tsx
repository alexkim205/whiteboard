import clsx from "clsx";
import {ElementComponentProps} from "../types";
import {useState} from "react";

const dragImg = new Image(0,0);
dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export function TextElement({value, onChange, className, placement}: ElementComponentProps): JSX.Element {
    const [dragging, setDragging] = useState(false)
    const [initialPlacement, setInitialPlacement] = useState({x: 0, y: 0})
    const [currentPlacement, setCurrentPlacement] = useState({x: placement.x, y: placement.y})

    console.log("DRAGGIN PLACEENT", value, onChange, className, dragging, initialPlacement, currentPlacement)

    return (
        <input
            draggable
            value={value}
            className={clsx(className, "absolute border-dashed border text-7xl px-8 py-4 cursor-none")}
            autoFocus
            onChange={e => onChange({value: e.target.value})}
            onDragStart={(e) => {
                e.dataTransfer.setDragImage(dragImg, 0, 0)
                setDragging(true)
                setInitialPlacement({
                    x: e.pageX,
                    y: e.pageY
                })
                setCurrentPlacement({
                    x: e.clientX,
                    y: e.clientY
                })
            }}
            onDragEnd={() => {
                setDragging(false)
            }}
            onDrag={(e) => {
                if (e.clientY ===0 && e.clientX === 0) return
                setCurrentPlacement({
                    x: e.clientX,
                    y: e.clientY
                })
            }}
            style={{
                transform: `translate(${currentPlacement.x - initialPlacement.x}px, ${currentPlacement.y - initialPlacement.y}px)`,
                transition: dragging ? '0s' : '200ms'
            }}
        />
    )
}