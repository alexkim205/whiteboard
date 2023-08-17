import {actions, defaults, kea, key, reducers, path} from "kea";
import {Tool} from "../types"
import type { canvasLogicType } from "./canvasLogicType";

export const canvasLogic = kea<canvasLogicType>([
    path(["src", "canvasLogic"]),
    key(() => 'global'),
    defaults(() => ({
        tool: Tool.Draw as Tool
    })),
    actions(() => ({
        selectTool: (tool: Tool) => ({tool})
    })),
    reducers(() => ({
        tool: {
            selectTool: (_, {tool}) => tool
        }
    }))
])