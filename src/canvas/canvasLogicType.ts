// Generated by kea-typegen on Thu, 17 Aug 2023 18:20:14 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { CanvasLogicProps } from './canvasLogic'
import type { AddableElement, AddableTool, BrushSize, CanvasInteractionHandlers, Tool } from '../types'

export interface canvasLogicType extends Logic {
    actionCreators: {
        addElement: (tool: AddableTool | null) => ({
            type: "add element (src.canvasLogic.*)";
            payload: {
                tool: AddableTool | null;
            };
        });
        setMouseDown: (mouseDown: boolean) => ({
            type: "set mouse down (src.canvasLogic.*)";
            payload: {
                mouseDown: boolean;
            };
        });
        initCanvas: (canvas: HTMLCanvasElement | null) => ({
            type: "init canvas (src.canvasLogic.*)";
            payload: {
                canvas: HTMLCanvasElement | null;
            };
        });
        selectTool: (tool: Tool) => ({
            type: "select tool (src.canvasLogic.*)";
            payload: {
                tool: Tool;
            };
        });
        setBrushSize: (brushSize: number) => ({
            type: "set brush size (src.canvasLogic.*)";
            payload: {
                brushSize: number;
            };
        });
        bakeIntoCanvas: () => ({
            type: "bake into canvas (src.canvasLogic.*)";
            payload: {
                value: true;
            };
        });
        getCanvas: (_: any) => ({
            type: "get canvas (src.canvasLogic.*)";
            payload: any;
        });
        getCanvasSuccess: (canvas: HTMLCanvasElement | null, payload?: any) => ({
            type: "get canvas success (src.canvasLogic.*)";
            payload: {
                canvas: HTMLCanvasElement | null;
                payload?: any;
            };
        });
        getCanvasFailure: (error: string, errorObject?: any) => ({
            type: "get canvas failure (src.canvasLogic.*)";
            payload: {
                error: string;
                errorObject?: any;
            };
        });
        saveCanvas: (_: any) => ({
            type: "save canvas (src.canvasLogic.*)";
            payload: any;
        });
        saveCanvasSuccess: (canvas: HTMLCanvasElement | null, payload?: any) => ({
            type: "save canvas success (src.canvasLogic.*)";
            payload: {
                canvas: HTMLCanvasElement | null;
                payload?: any;
            };
        });
        saveCanvasFailure: (error: string, errorObject?: any) => ({
            type: "save canvas failure (src.canvasLogic.*)";
            payload: {
                error: string;
                errorObject?: any;
            };
        });
    };
    actionKeys: {
        "add element (src.canvasLogic.*)": "addElement";
        "set mouse down (src.canvasLogic.*)": "setMouseDown";
        "init canvas (src.canvasLogic.*)": "initCanvas";
        "select tool (src.canvasLogic.*)": "selectTool";
        "set brush size (src.canvasLogic.*)": "setBrushSize";
        "bake into canvas (src.canvasLogic.*)": "bakeIntoCanvas";
        "get canvas (src.canvasLogic.*)": "getCanvas";
        "get canvas success (src.canvasLogic.*)": "getCanvasSuccess";
        "get canvas failure (src.canvasLogic.*)": "getCanvasFailure";
        "save canvas (src.canvasLogic.*)": "saveCanvas";
        "save canvas success (src.canvasLogic.*)": "saveCanvasSuccess";
        "save canvas failure (src.canvasLogic.*)": "saveCanvasFailure";
    };
    actionTypes: {
        addElement: "add element (src.canvasLogic.*)";
        setMouseDown: "set mouse down (src.canvasLogic.*)";
        initCanvas: "init canvas (src.canvasLogic.*)";
        selectTool: "select tool (src.canvasLogic.*)";
        setBrushSize: "set brush size (src.canvasLogic.*)";
        bakeIntoCanvas: "bake into canvas (src.canvasLogic.*)";
        getCanvas: "get canvas (src.canvasLogic.*)";
        getCanvasSuccess: "get canvas success (src.canvasLogic.*)";
        getCanvasFailure: "get canvas failure (src.canvasLogic.*)";
        saveCanvas: "save canvas (src.canvasLogic.*)";
        saveCanvasSuccess: "save canvas success (src.canvasLogic.*)";
        saveCanvasFailure: "save canvas failure (src.canvasLogic.*)";
    };
    actions: {
        addElement: (tool: AddableTool | null) => void;
        setMouseDown: (mouseDown: boolean) => void;
        initCanvas: (canvas: HTMLCanvasElement | null) => void;
        selectTool: (tool: Tool) => void;
        setBrushSize: (brushSize: number) => void;
        bakeIntoCanvas: () => void;
        getCanvas: (_: any) => void;
        getCanvasSuccess: (canvas: HTMLCanvasElement | null, payload?: any) => void;
        getCanvasFailure: (error: string, errorObject?: any) => void;
        saveCanvas: (_: any) => void;
        saveCanvasSuccess: (canvas: HTMLCanvasElement | null, payload?: any) => void;
        saveCanvasFailure: (error: string, errorObject?: any) => void;
    };
    asyncActions: {
        addElement: (tool: AddableTool | null) => Promise<any>;
        setMouseDown: (mouseDown: boolean) => Promise<any>;
        initCanvas: (canvas: HTMLCanvasElement | null) => Promise<any>;
        selectTool: (tool: Tool) => Promise<any>;
        setBrushSize: (brushSize: number) => Promise<any>;
        bakeIntoCanvas: () => Promise<any>;
        getCanvas: (_: any) => Promise<any>;
        getCanvasSuccess: (canvas: HTMLCanvasElement | null, payload?: any) => Promise<any>;
        getCanvasFailure: (error: string, errorObject?: any) => Promise<any>;
        saveCanvas: (_: any) => Promise<any>;
        saveCanvasSuccess: (canvas: HTMLCanvasElement | null, payload?: any) => Promise<any>;
        saveCanvasFailure: (error: string, errorObject?: any) => Promise<any>;
    };
    defaults: {
        canvas: HTMLCanvasElement | null;
        tool: Tool;
        brushSize: BrushSize;
        canvasLoading: boolean;
    };
    events: {};
    key: number | "global";
    listeners: {
        "initCanvas": ((action: {
            type: "init canvas (src.canvasLogic.*)";
            payload: {
                canvas: HTMLCanvasElement | null;
            };
        }, previousState: any) => void | Promise<void>)[];
        "selectTool": ((action: {
            type: "select tool (src.canvasLogic.*)";
            payload: {
                tool: Tool;
            };
        }, previousState: any) => void | Promise<void>)[];
        "bakeIntoCanvas": ((action: {
            type: "bake into canvas (src.canvasLogic.*)";
            payload: {
                value: true;
            };
        }, previousState: any) => void | Promise<void>)[];
    };
    path: [
        "src",
        "canvasLogic",
        "*"
    ];
    pathString: "src.canvasLogic.*";
    props: CanvasLogicProps;
    reducer: (state: any, action: any, fullState: any) => {
        canvas: HTMLCanvasElement | null;
        tool: Tool;
        brushSize: BrushSize;
        canvasLoading: boolean;
    };
    reducers: {
        canvas: (state: HTMLCanvasElement | null, action: any, fullState: any) => HTMLCanvasElement | null;
        tool: (state: Tool, action: any, fullState: any) => Tool;
        brushSize: (state: BrushSize, action: any, fullState: any) => BrushSize;
        canvasLoading: (state: boolean, action: any, fullState: any) => boolean;
    };
    selector: (state: any) => {
        canvas: HTMLCanvasElement | null;
        tool: Tool;
        brushSize: BrushSize;
        canvasLoading: boolean;
    };
    selectors: {
        canvas: (state: any, props?: any) => HTMLCanvasElement | null;
        tool: (state: any, props?: any) => Tool;
        brushSize: (state: any, props?: any) => BrushSize;
        canvasLoading: (state: any, props?: any) => boolean;
        elementToAdd: (state: any, props?: any) => AddableElement | null;
        mouseDown: (state: any, props?: any) => boolean;
        ctx: (state: any, props?: any) => CanvasRenderingContext2D | null | undefined;
        isAddableTool: (state: any, props?: any) => boolean;
        isDrawableTool: (state: any, props?: any) => boolean;
        canvasInteractionHandlers: (state: any, props?: any) => CanvasInteractionHandlers;
    };
    sharedListeners: {};
    values: {
        canvas: HTMLCanvasElement | null;
        tool: Tool;
        brushSize: BrushSize;
        canvasLoading: boolean;
        elementToAdd: AddableElement | null;
        mouseDown: boolean;
        ctx: CanvasRenderingContext2D | null | undefined;
        isAddableTool: boolean;
        isDrawableTool: boolean;
        canvasInteractionHandlers: CanvasInteractionHandlers;
    };
    _isKea: true;
    _isKeaWithKey: true;
    __keaTypeGenInternalSelectorTypes: {
        ctx: (canvas: HTMLCanvasElement | null) => CanvasRenderingContext2D | null | undefined;
        isAddableTool: (tool: Tool) => boolean;
        isDrawableTool: (tool: Tool) => boolean;
        canvasInteractionHandlers: (canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null | undefined, tool: Tool, mouseDown: boolean, brushSize: BrushSize) => CanvasInteractionHandlers;
    };
}