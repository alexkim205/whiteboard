import clsx from "clsx";
import {useValues} from "kea";
import {canvasLogic} from "../canvas/canvasLogic";
import {LuHand} from "react-icons/lu";
import {mouseLogic} from "./mouseLogic";

const HOVER_BRUSH_SIZE = 48

export function Mouse(): JSX.Element {
    const {mouseDown, position} = useValues(mouseLogic)
    const {brushSize, isAddableTool} = useValues(canvasLogic({id: 1}))

    return isAddableTool ? <div
        id="dynamiccursor"
        className={clsx(
            "pointer-events-none rounded-full absolute z-50",
            mouseDown && "invisible"
        )} style={{
        left: position.x - 30,
        top: position.y - 30,
        height: 60,
        width: 60,
    }}>
        <LuHand className="w-[60px] h-[60px]"/>
    </div> : <div
        id="dynamiccursor"
        className={clsx(
            "transition-[colors,transform] origin-center pointer-events-none rounded-full absolute z-50",
            mouseDown ? "bg-black" : "bg-stone-600/30"
        )} style={{
        left: position.x - HOVER_BRUSH_SIZE / 2,
        top: position.y - HOVER_BRUSH_SIZE / 2,
        height: HOVER_BRUSH_SIZE,
        width: HOVER_BRUSH_SIZE,
        transform: `scale(${(mouseDown ? brushSize : HOVER_BRUSH_SIZE) / HOVER_BRUSH_SIZE})`
    }}/>
}