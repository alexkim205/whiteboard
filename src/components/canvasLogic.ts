import {actions, connect, defaults, kea, key, listeners, path, props, reducers, selectors} from "kea";
import {BrushSize, CanvasInteractionHandlers, CanvasState, EMPTY_CANVAS_INTERACTION_HANDLERS, Tool} from "../types"
import type {canvasLogicType} from "./canvasLogicType";
import {addableCanvasLogic} from "../blocks/addableCanvasLogic";

export interface CanvasLogicProps {
    id: number // Canvas id that can be stored in the backend
}

export const canvasLogic = kea<canvasLogicType>([
    props({} as CanvasLogicProps),
    path(["src", "canvasLogic"]),
    key((props) => props.id ?? 'global'),
    connect((props: CanvasLogicProps)=> ({
        actions: [addableCanvasLogic(props), ['addElement']],
        values: [addableCanvasLogic(props), ['elementToAdd']],
    })),
    defaults(() => ({
        canvas: null as HTMLCanvasElement | null,
        tool: Tool.Draw as Tool,
        mouseDown: false,
        brushSize: BrushSize.Small as BrushSize,
        canvasState: CanvasState.Editing as CanvasState
    })),
    actions(() => ({
        initCanvas:(canvas: HTMLCanvasElement | null) => ({canvas}),
        selectTool: (tool: Tool) => ({tool}),
        setMouseDown: (mouseDown: boolean) => ({mouseDown}),
        setBrushSize: (brushSize: number) => ({brushSize}),
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
    listeners(({values, actions}) => ({
        initCanvas: () => {
            if (values.ctx && values.canvas) {
                // Initialize canvas with a white background and define line styles
                values.ctx.fillStyle="#FFFFFF";
                values.ctx.fillRect(0,0,values.canvas.width,values.canvas.height);
                values.ctx.lineCap = "round"
            }
        },
        selectTool: ({tool}) => {
            // Conditionally render addable canvas elements depending on which tool is selected
            if (tool === Tool.Text || tool === Tool.Emoji) {
                actions.addElement(tool)
            } else {
                actions.addElement(null)
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
                if (tool === Tool.Text) {
                    return {
                        onMouseUp: () => {
                            actions.setMouseDown(false)
                            actions.addElement(Tool.Text)
                        }
                    }
                }
                return EMPTY_CANVAS_INTERACTION_HANDLERS
            }
        ]
    }))
])