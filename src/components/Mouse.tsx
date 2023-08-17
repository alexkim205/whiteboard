import clsx from "clsx";
import {useValues} from "kea";
import {canvasLogic} from "./canvasLogic";
import {useMousePosition} from "./useMouse";
import {Tool} from "../types";

const HOVER_BRUSH_SIZE = 48

export function Mouse(): JSX.Element {
    const {x, y} = useMousePosition()
    const {mouseDown, brushSize, tool} = useValues(canvasLogic)

    const isAddableTool = [Tool.Text, Tool.Emoji].includes(tool)

    return <div
        id="dynamiccursor"
        className={clsx(
            "transition-[colors,transform] origin-center pointer-events-none rounded-full absolute z-50",
            mouseDown ? "bg-black" : "bg-stone-600/30"
        )} style={{
        left: x - HOVER_BRUSH_SIZE / 2,
        top: y - HOVER_BRUSH_SIZE / 2,
        height: HOVER_BRUSH_SIZE,
        width: HOVER_BRUSH_SIZE,
        transform: isAddableTool ? `scale(${mouseDown ? 0 : 1})` : `scale(${(mouseDown ? brushSize : HOVER_BRUSH_SIZE) / HOVER_BRUSH_SIZE})`
    }}/>
}