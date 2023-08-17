import {LuEraser, LuPencil, LuSmile, LuTextCursor} from "react-icons/lu";
import {BrushSize, Tool} from "../types";
import {useActions, useValues} from "kea";
import {canvasLogic} from "../canvas/canvasLogic";
import clsx from "clsx";
import {addableCanvasLogic} from "../addable/addableCanvasLogic";

const brushSizes = [
    {
        label: "Small",
        value: BrushSize.Small,
    },
    {
        label: "Medium",
        value: BrushSize.Medium,
    },
    {
        label: "Large",
        value: BrushSize.Large,
    },
]

const emojis = [
    {
        label: "Heart",
        value: "❤️",
    },
    {
        label: "Thumbs up",
        value: "👍",
    },
    {
        label: "Laugh",
        value: "😂",
    },
    {
        label: "Celebrate",
        value: "🎉"
    }
]

export const TOOLBAR_HEIGHT = 98

export function Toolbar(): JSX.Element {
    const {selectTool, setBrushSize, saveCanvas} = useActions(canvasLogic({id: 1}))
    const {tool, brushSize, isDrawableTool, canvasLoading} = useValues(canvasLogic({id: 1}))
    const {elementToAdd} = useValues(addableCanvasLogic({id: 1}))
    const {setElement} = useActions(addableCanvasLogic({id: 1}))

    const tools = [
        {
            label: "Draw",
            value: Tool.Draw,
            Icon: LuPencil
        },
        {
            label: "Erase",
            value: Tool.Erase,
            Icon: LuEraser
        },
        {
            label: "Text",
            value: Tool.Text,
            Icon: LuTextCursor,
        },
        {
            label: "Emoji",
            value: Tool.Emoji,
            Icon: LuSmile
        }
    ]

    return (
        <div id="toolbar" className="relative flex flex-row justify-between p-4 border-b-2 border-black">
            <div className="flex flex-row gap-4">
                {tools.map(({label, value, Icon}) => (
                    <div
                        className={clsx(tool === value && "border-black", "duration-75 transition-all hover:scale-105 border-2 hover:border-black rounded-md")}
                        key={label} title={label}
                        onClick={() => {
                            selectTool(value)
                        }}>
                        <Icon className={clsx("text-6xl p-3")}/>
                    </div>
                ))}
            </div>
                <div className="flex flex-row gap-4">
                    {isDrawableTool && brushSizes.map(({label, value}) => (
                        <div
                            className={clsx(brushSize === value && "border-black", "flex justify-center items-center w-16 h-16 duration-75 transition-all hover:scale-105 border-2 hover:border-black rounded-md")}
                            key={label} title={label} onClick={() => {
                            setBrushSize(value)
                        }}>
                            <div className="shrink-0 bg-black rounded-full" style={{width: value, height: value}}/>
                        </div>
                    ))}
                    {tool === Tool.Emoji && elementToAdd && emojis.map(({label, value}) => (
                        <div
                            className={clsx(value === elementToAdd.value && "border-black", "text-4xl flex justify-center items-center w-16 h-16 duration-75 transition-all hover:scale-105 border-2 hover:border-black rounded-md")}
                            key={label} title={label} onClick={() => {
                            setElement({value})
                        }}>
                            {value}
                        </div>
                    ))}
                </div>
            <button
                // disabled={canvasLoading}
                onClick={() => {
                    !canvasLoading && saveCanvas({})
                }}
                className={clsx(canvasLoading && "opacity-50", "px-8 py-2 bg-blue-600 hover:bg-blue-400 cursor-pointer text-white rounded-md text-xl")}
                onMouseMove={(e) => e.preventDefault()}>
                {canvasLoading ? "Loading..." : "Save"}
            </button>
        </div>
    )
}