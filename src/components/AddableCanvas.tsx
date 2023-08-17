import {TOOLBAR_HEIGHT} from "./Toolbar";
import {DragItem, ElementComponentProps, Tool} from "../types";
import {TextElement} from "../blocks/TextElement";
import {EmojiElement} from "../blocks/EmojiElement";
import {useActions, useValues} from "kea";
import {addableCanvasLogic} from "../blocks/addableCanvasLogic";
import {useDrop, XYCoord} from "react-dnd";
import {mouseLogic} from "./mouseLogic";

export function AddableCanvas(): JSX.Element {
    const {elementToAdd} = useValues(addableCanvasLogic)
    const {setElement} = useActions(addableCanvasLogic)
    const {setMouseDown, setPosition} = useActions(mouseLogic)

    const [, drop] = useDrop(
        () => ({
            accept: [Tool.Text, Tool.Emoji],
            drop(item: DragItem, monitor) {
                if (!elementToAdd) return
                const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
                const x = Math.round(item.left + delta.x)
                const y = Math.round(item.top + delta.y)
                setElement({placement: {...elementToAdd.placement, x, y}})
                setMouseDown(false)
                setPosition(monitor.getClientOffset() as XYCoord)
            },
        }),
        [elementToAdd],
    )

    function renderElement(): JSX.Element {
        if (!elementToAdd) return <></>
        const sharedProps: ElementComponentProps = {
            ...elementToAdd,
            id: `new-${elementToAdd.type}`,
            onChange: (element) => {
                setElement(element)
            },
        }
        if (elementToAdd.type === Tool.Text) {
            return <TextElement {...sharedProps}/>
        } else {
            return <EmojiElement {...sharedProps}/>
        }
    }

    return elementToAdd ? (
        <div
            ref={drop}
            id="whiteboard--adding-element" className="overflow-hidden z-20 absolute inset-x-0 bottom-0 bg-transparent cursor-none"
            style={{top: TOOLBAR_HEIGHT}}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
        >
            {renderElement()}
        </div>
    ) : <></>
}