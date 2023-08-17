import {actions, connect, defaults, kea, key, listeners, path, props, reducers, selectors} from "kea";
import {BrushSize, CanvasInteractionHandlers, EMPTY_CANVAS_INTERACTION_HANDLERS, Tool} from "../types"
import type {canvasLogicType} from "./canvasLogicType";
import {addableCanvasLogic} from "../addable/addableCanvasLogic";
import {mouseLogic} from "../components/mouseLogic";
import {BORDER_WIDTH, TEXT_PADDING_X, TEXT_SIZE} from "../addable/TextElement";
import {TOOLBAR_HEIGHT} from "../components/Toolbar";
import {EMOJI_PADDING} from "../addable/EmojiElement";
import {loaders} from "kea-loaders";
import {api} from "../api";

export interface CanvasLogicProps {
    id?: number // Canvas id that can be stored in the backend
}

export const canvasLogic = kea<canvasLogicType>([
    props({} as CanvasLogicProps),
    path((key) => ["src", "canvasLogic", key]),
    key((props) => props.id ?? 'global'),
    connect((props: CanvasLogicProps)=> ({
        actions: [addableCanvasLogic(props), ['addElement'], mouseLogic, ["setMouseDown"]],
        values: [addableCanvasLogic(props), ['elementToAdd'], mouseLogic, ["mouseDown"]],
    })),
    defaults(() => ({
        canvas: null as HTMLCanvasElement | null,
        tool: Tool.Draw as Tool,
        brushSize: BrushSize.Small as BrushSize,
    })),
    actions(() => ({
        initCanvas:(canvas: HTMLCanvasElement | null) => ({canvas}),
        selectTool: (tool: Tool) => ({tool}),
        setBrushSize: (brushSize: number) => ({brushSize}),
        bakeIntoCanvas: true
    })),
    reducers(() => ({
        canvas: {
            initCanvas: (_, {canvas}) => canvas
        },
        tool: {
            selectTool: (_, {tool}) => tool
        },
        brushSize: {
            setBrushSize: (_, {brushSize}) => brushSize
        }
    })),
    loaders(({values, props}) =>({
        canvas: {
            getCanvas: async (_, breakpoint) => {
                // If specific canvas with id is not being requested, don't do anything
                // if (!props.id) return values.canvas

                // debounced fetch so that api is not called more than once every 3 seconds
                await breakpoint(3000);

                const response = await api.canvas.fetch(props.id)
                breakpoint();

                // If canvas data is initially fetched, paint the canvas
                if (response) {
                    const img = new Image;
                    img.onload = function(){
                        values.ctx?.drawImage(img,0,0); // Or at whatever offset you like
                    };
                    img.src = response;
                }

                return values.canvas
            },
            saveCanvas: async (_, breakpoint) => {
                // If specific canvas with id is not being requested, don't do anything
                // if (!props.id) return values.canvas

                // debounced save so that api is not called more than once every 3 seconds
                await breakpoint(3000);

                if (!values.canvas) return values.canvas

                await api.canvas.save(props.id, values.canvas.toDataURL())
                breakpoint();

                return values.canvas
            }
        }
    })),
    listeners(({values, actions}) => ({
        initCanvas: () => {
            if (!values.ctx || !values.canvas) {
                return
            }
            // Initialize canvas with a white background and define line styles
            values.ctx.fillStyle="#FFFFFF";
            values.ctx.fillRect(0,0,values.canvas.width,values.canvas.height);
            values.ctx.lineCap = "round"

            // Fetch canvas data from server
            actions.getCanvas({})
        },
        selectTool: ({tool}) => {
            // If there was an addable element, bake it into the main canvas before switching to the next tool
            actions.bakeIntoCanvas()

            // Conditionally render addable canvas elements depending on which tool is selected
            if (tool === Tool.Text || tool === Tool.Emoji) {
                actions.addElement(tool)
            }
        },
        bakeIntoCanvas: () => {
            if (values.ctx && values.elementToAdd) {
                values.ctx.fillStyle="#000000"
                values.ctx.font = `${TEXT_SIZE}px sans-serif`

                // Different baking positions because padding is different for emoji and text elements
                if (values.elementToAdd.type === Tool.Text) {
                    values.ctx.fillText(values.elementToAdd.value, values.elementToAdd.placement.x + TEXT_PADDING_X + BORDER_WIDTH, values.elementToAdd.placement.y + TOOLBAR_HEIGHT + BORDER_WIDTH);
                } else if (values.elementToAdd.type === Tool.Emoji) {
                    values.ctx.fillText(values.elementToAdd.value, values.elementToAdd.placement.x + EMOJI_PADDING, values.elementToAdd.placement.y + TOOLBAR_HEIGHT - EMOJI_PADDING * 2);
                }
            }

            actions.addElement(null)
        }
    })),
    selectors(({actions}) => ({
        ctx: [
            (s) => [s.canvas],
            (canvas) => canvas?.getContext("2d")
        ],
        isAddableTool: [(s) => [s.tool], (tool) => [Tool.Text, Tool.Emoji].includes(tool)],
        isDrawableTool: [(s) => [s.tool], (tool) => [Tool.Draw, Tool.Erase].includes(tool)],
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