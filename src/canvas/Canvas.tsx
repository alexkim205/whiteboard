import {useLayoutEffect, useRef} from "react";
import {useActions, useValues} from "kea";
import {canvasLogic} from "./canvasLogic";
import {TOOLBAR_HEIGHT} from "../components/Toolbar";
import {AddableCanvas} from "../addable/AddableCanvas";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export function Canvas(): JSX.Element {
    const {initCanvas} = useActions(canvasLogic({id: 1}))
    const {canvasInteractionHandlers} = useValues(canvasLogic(({id: 1})))

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