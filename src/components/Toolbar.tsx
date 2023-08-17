import {LuEraser, LuImage, LuPencil, LuSmile, LuTextCursor} from "react-icons/lu";
import {Tool} from "../types";
import {useActions} from "kea";
import {canvasLogic} from "./canvasLogic";

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
        Icon: LuTextCursor
    },
    {
        label: "Image",
        value: Tool.Image,
        Icon: LuImage
    },
    {
        label: "Emoji",
        value: Tool.Emoji,
        Icon: LuSmile
    }
]

export function Toolbar(): JSX.Element {
    const {selectTool} = useActions(canvasLogic)

    return (
        <div id="toolbar" className="flex flex-row gap-4 p-4 border-b-2 border-black">
            {tools.map(({label, value, Icon}) => (
                <div key={label} title={label} onClick={() => {
                    selectTool(value)
                }}>
                    <Icon className="text-6xl p-2"/>
                </div>
            ))}
        </div>
    )
}