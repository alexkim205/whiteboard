import clsx from "clsx";
import {ElementComponentProps, Tool} from "../types";
import {useDrag} from "react-dnd";
export const TEXT_SIZE = 72 // corresponds to text-7xl in tailwindcss
export const TEXT_PADDING_X = 32
export const TEXT_PADDING_Y = 39

export const BORDER_WIDTH = 4

export function TextElement({id, value, onChange, className, placement}: ElementComponentProps): JSX.Element {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: Tool.Text,
            item: { id, left: placement.x, top: placement.y },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, placement.x, placement.y],
    )

    return (
        <input
            ref={drag}
            value={value}
            className={clsx(className, "absolute border-dashed font-medium border-black border-4 text-7xl cursor-none", isDragging && "invisible")}
            autoFocus
            onChange={e => onChange({value: e.target.value})}
            style={{ left: placement.x, top: placement.y, width: placement.width, height: placement.height, padding: `${TEXT_PADDING_Y}px ${TEXT_PADDING_X}px` }}
        />
    )
}