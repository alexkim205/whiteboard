import {useLayoutEffect, useRef} from "react";
import {useActions, useValues} from "kea";
import {canvasLogic} from "./canvasLogic";

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
            <canvas
                id='whiteboard'
                ref={ref}
                className="grow"
                width={window.innerWidth}
                height={window.innerHeight - 98}
                {...canvasInteractionHandlers}
            />
    )
}