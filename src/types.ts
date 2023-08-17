import {HTMLProps} from "react";

export enum Tool {
    Draw = 'draw',
    Erase = 'erase',
    Text = 'text',
    Image = 'image',
    Emoji = 'emoji'
}

export enum BrushSize {
    Small = 10,
    Medium = 20,
    Large = 40
}

// Canvas data can be saved as a image/png data url string
export type CanvasDataUrl = string

// In a second pass, I'd include touch event handlers so that the canvas is supported on mobile as well.
export interface CanvasInteractionHandlers extends Pick<HTMLProps<HTMLCanvasElement>, "onMouseDown" | "onMouseUp" | "onMouseMove"> {}

export const EMPTY_CANVAS_INTERACTION_HANDLERS = {
    onMouseDown: undefined,
    onMouseUp: undefined,
    onMouseMove: undefined
}