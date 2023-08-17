import {useMousePosition} from "./useMouse";
import clsx from "clsx";
import {useValues} from "kea";
import {canvasLogic} from "./canvasLogic";

const HOVER_BRUSH_SIZE = 48

export function Mouse(): JSX.Element {
    const {x, y} = useMousePosition()
    const {mouseDown, brushSize} = useValues(canvasLogic)

    return (
        <div id="circlecursor" className={clsx(
            "transition-[colors,transform] origin-center pointer-events-none bg-stone-600/30 rounded-full absolute z-10",
            mouseDown && "bg-black"
        )} style={{
            left: x - HOVER_BRUSH_SIZE / 2,
            top: y - HOVER_BRUSH_SIZE / 2,
            height: HOVER_BRUSH_SIZE,
            width: HOVER_BRUSH_SIZE,
            transform: `scale(${(mouseDown ? brushSize : HOVER_BRUSH_SIZE) / HOVER_BRUSH_SIZE})`
        }}/>
    )
}