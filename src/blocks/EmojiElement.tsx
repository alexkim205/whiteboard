import {ElementComponentProps} from "../types";
import clsx from "clsx";

export function EmojiElement({value, onChange, className}: ElementComponentProps): JSX.Element {
    return (
        <div
            className={clsx(className, "absolute")}
            style={{
                top: placement.y,
                left: placement.x,
                height: placement.height,
                width: placement.width
            }}
        >
            {value}
        </div>
    )
}