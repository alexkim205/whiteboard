import {kea, key, props, path, actions, reducers, defaults} from "kea";
import {CanvasLogicProps} from "../components/canvasLogic";
import {AddableElement, AddableTool, Tool} from "../types";
import {TOOLBAR_HEIGHT} from "../components/Toolbar";
import type { addableCanvasLogicType } from "./addableCanvasLogicType";

export const addableCanvasLogic = kea<addableCanvasLogicType>([
    path(["src", "components", "addableCanvasLogic"]),
    props({} as CanvasLogicProps),
    key((props) => props.id ?? 'global'),
    defaults(() => ({
        elementToAdd: null as AddableElement | null
    })),
    actions(() => ({
        addElement: (tool: AddableTool | null) => ({tool}),
        setElement: (element: Partial<AddableElement> | null) => ({element})
    })),
    reducers(() => ({
        elementToAdd: {
            setElement: (prevElementToAdd, {element}) => element ? ({...prevElementToAdd, ...element}) as AddableElement : null,
            addElement: (_, {tool }) => {
                if (!tool) {
                    return null
                }
                if (tool === Tool.Text) {
                    return {
                        type: Tool.Text,
                        value: "",
                        placement: {
                            x: window.innerWidth / 2 - 300,
                            y: (window.innerHeight - TOOLBAR_HEIGHT) / 2 - 75,
                            width: 600,
                            height: 150
                        }
                    }
                }
                if (tool === Tool.Emoji) {
                    return {
                        type: Tool.Emoji,
                        value: "❤️",
                        placement: {
                            x: window.innerWidth / 2 - 50,
                            y: (window.innerHeight - TOOLBAR_HEIGHT) / 2 - 50,
                            width: 100,
                            height: 100
                        }
                    }
                }
                return null
            }
        }
    }))
])