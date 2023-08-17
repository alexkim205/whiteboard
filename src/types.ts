import {HTMLProps} from "react";

export enum Tool {
    Draw = 'draw',
    Erase = 'erase',
    Text = 'text',
    Emoji = 'emoji'
}

export type AddableTool = Tool.Text | Tool.Emoji

export enum BrushSize {
    Small = 10,
    Medium = 20,
    Large = 40
}

export enum CanvasState {
    Editing = 'editing', // Default state
    Saving = 'saving', /* TODO: mocked */
    AddingElement = 'adding_element' // Adding an element renders an overlay gui on top of the canvas that lets you customize the element before committing it to the canvas.
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

export interface ElementPlacement {
    x: number
    y: number
    width: number
    height: number
}

export interface AddableElement {
    type: AddableTool
    value: string
    placement: ElementPlacement
}

export interface ElementComponentProps {
    id: string
    value: string
    onChange: (element: Partial<AddableElement> | null) => void
    className?: string
    flush?: boolean
    placement: ElementPlacement
}

export interface DragItem {
    type: string
    id: string
    top: number
    left: number
}