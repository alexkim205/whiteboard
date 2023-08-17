import {actions, afterMount, beforeUnmount, defaults, kea, listeners, path, reducers} from "kea";
import {XYCoord} from "react-dnd";
import type { mouseLogicType } from "./mouseLogicType";

export const mouseLogic = kea<mouseLogicType>([
    path(["src", "components", "mouseLogic"]),
    defaults(() => ({
        position: {x: 0, y:0} as XYCoord,
        mouseDown: false,
    })),
    actions(() => ({
        setPosition: (coord: XYCoord) => ({coord}),
        setPositionFromEvent: (e: MouseEvent) => ({e}),
        setMouseDown: (mouseDown: boolean) => ({mouseDown}),
    })),
    reducers(() => ({
        position: {
            setPosition: (_, {coord}) => coord
        },
        mouseDown: {
            setMouseDown: (_, {mouseDown}) => mouseDown
        },
    })),
    listeners(({actions}) => ({
        setPositionFromEvent: ({e}) => {
            actions.setPosition({x: e.clientX, y: e.clientY})
        }
    })),
    afterMount(({actions}) =>{
        window.addEventListener("mousemove", actions.setPositionFromEvent)
    }),
    beforeUnmount(({actions}) => {
        window.removeEventListener("mousemove", actions.setPositionFromEvent);
    })
])