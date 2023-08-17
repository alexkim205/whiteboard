import {TOOLBAR_HEIGHT} from "./Toolbar";
import {ElementComponentProps, Tool} from "../types";
import {TextElement} from "../blocks/TextElement";
import {EmojiElement} from "../blocks/EmojiElement";
import {useActions, useValues} from "kea";
import {addableCanvasLogic} from "../blocks/addableCanvasLogic";
import {canvasLogic} from "./canvasLogic";

export function AddableCanvas(): JSX.Element {
    const {elementToAdd} = useValues(addableCanvasLogic)
    const {setElement} = useActions(addableCanvasLogic)
    const {setMouseDown} = useActions(canvasLogic)
    const {mouseDown} = useValues(canvasLogic)

    function renderElement(): JSX.Element {
        if (!elementToAdd) return <></>
        const sharedProps: ElementComponentProps = {
            ...elementToAdd,
            onChange: (element) => {
                console.log("DOOOO", element)
                setElement(element)
            },
            isDragging: mouseDown
        }
        if (elementToAdd.type === Tool.Text) {
            return <TextElement {...sharedProps}/>
        } else {
            return <EmojiElement {...sharedProps}/>
        }
    }

    return elementToAdd ? (
        <div
            id="whiteboard--adding-element" className="z-20 absolute inset-x-0 bottom-0 bg-transparent"
            style={{top: TOOLBAR_HEIGHT}}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
        >
            {renderElement()}
        </div>
    ) : <></>
}