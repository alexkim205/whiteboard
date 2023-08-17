import clsx from "clsx";
import {ElementComponentProps, Tool} from "../types";
import {useDrag} from "react-dnd";

export const EMOJI_SIZE = 72
export const EMOJI_PADDING = 12

export function EmojiElement({id, value, className, placement}: ElementComponentProps): JSX.Element {
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
        <div
            ref={drag}
            className={clsx(className, "absolute border-dashed border-4 border-black font-medium flex justify-center items-center bg-transparent text-7xl cursor-none", isDragging && "invisible")}
            style={{ left: placement.x, top: placement.y, width: placement.width, height: placement.height, padding: EMOJI_PADDING }}
        >
            <div>{value}</div>
        </div>
    )
}