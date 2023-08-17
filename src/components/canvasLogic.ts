import {actions, defaults, kea, key, reducers, path, selectors, props, listeners} from "kea";
import {BrushSize, CanvasInteractionHandlers, EMPTY_CANVAS_INTERACTION_HANDLERS, Tool} from "../types"
import type { canvasLogicType } from "./canvasLogicType";

export interface CanvasLogicProps {
    id: number // Canvas id that can be stored in the backend
}

export const canvasLogic = kea<canvasLogicType>([
    props({} as CanvasLogicProps),
    path(["src", "canvasLogic"]),
    key((props) => props.id ?? 'global'),
    defaults(() => ({
        canvas: null as HTMLCanvasElement | null,
        tool: Tool.Draw as Tool,
        mouseDown: false,
        brushSize: BrushSize.Small as BrushSize
    })),
    actions(() => ({
        initCanvas:(canvas: HTMLCanvasElement | null) => ({canvas}),
        selectTool: (tool: Tool) => ({tool}),
        setMouseDown: (mouseDown: boolean) => ({mouseDown}),
        setBrushSize: (brushSize: number) => ({brushSize})
    })),
    reducers(() => ({
        canvas: {
            initCanvas: (_, {canvas}) => canvas
        },
        tool: {
            selectTool: (_, {tool}) => tool
        },
        mouseDown: {
            setMouseDown: (_, {mouseDown}) => mouseDown
        },
        brushSize: {
            setBrushSize: (_, {brushSize}) => brushSize
        }
    })),
    listeners(({values}) => ({
        initCanvas: () => {
            if (values.ctx && values.canvas) {
                // Initialize canvas with a white background and define line styles
                values.ctx.fillStyle="#FFFFFF";
                values.ctx.fillRect(0,0,values.canvas.width,values.canvas.height);
                values.ctx.lineCap = "round"
            }
        }
    })),
    selectors(({actions}) => ({
        ctx: [
            (s) => [s.canvas],
            (canvas) => canvas?.getContext("2d")
        ],
        canvasInteractionHandlers: [
            (s) => [s.canvas, s.ctx, s.tool, s.mouseDown, s.brushSize],
            (canvas, ctx, tool, mouseDown, brushSize): CanvasInteractionHandlers => {
                if (!canvas || !ctx) {
                    return EMPTY_CANVAS_INTERACTION_HANDLERS
                }
                if (tool === Tool.Draw || tool === Tool.Erase) {
                    return {
                        onMouseDown: (e) => {
                            actions.setMouseDown(true)
                            ctx.beginPath()
                            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                        },
                        onMouseMove: (e) => {
                            if (!mouseDown) {
                                return EMPTY_CANVAS_INTERACTION_HANDLERS
                            }
                            ctx.lineWidth = brushSize
                            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                            ctx.strokeStyle = tool === Tool.Erase ? "#FFFFFF" : "#000000";
                            ctx.stroke();
                        },
                        onMouseUp: () => {
                            actions.setMouseDown(false)
                            ctx.closePath()
                        }
                    }
                }
                return EMPTY_CANVAS_INTERACTION_HANDLERS
            }
        ]
    }))
])