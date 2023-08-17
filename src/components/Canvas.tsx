import {useLayoutEffect, useRef} from "react";
import {useActions, useValues} from "kea";
import {canvasLogic} from "./canvasLogic";
import {TOOLBAR_HEIGHT} from "./Toolbar";
import {AddableCanvas} from "./AddableCanvas";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export function Canvas(): JSX.Element {
    const {initCanvas} = useActions(canvasLogic)
    const {canvasInteractionHandlers} = useValues(canvasLogic)

    const ref = useRef<HTMLCanvasElement>(null)

    useLayoutEffect(() => {
        if (ref.current) {
            initCanvas(ref.current)
        }
    }, [ref])

    return (
        <>
            <canvas
                id='whiteboard'
                ref={ref}
                className="grow z-10"
                width={window.innerWidth}
                height={window.innerHeight - TOOLBAR_HEIGHT}
                {...canvasInteractionHandlers}
            />
            <DndProvider backend={HTML5Backend}>
                <AddableCanvas/>
            </DndProvider>
        </>
    )
}