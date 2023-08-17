// Generated by kea-typegen on Thu, 17 Aug 2023 00:48:22 GMT. DO NOT EDIT THIS FILE MANUALLY.

import type { Logic } from 'kea'

import type { Tool } from '../types'

export interface canvasLogicType extends Logic {
    actionCreators: {
        selectTool: (tool: Tool) => ({
            type: "select tool (src.canvasLogic)";
            payload: {
                tool: Tool;
            };
        });
    };
    actionKeys: {
        "select tool (src.canvasLogic)": "selectTool";
    };
    actionTypes: {
        selectTool: "select tool (src.canvasLogic)";
    };
    actions: {
        selectTool: (tool: Tool) => void;
    };
    asyncActions: {
        selectTool: (tool: Tool) => Promise<any>;
    };
    defaults: {
        tool: Tool;
    };
    events: {};
    key: string;
    listeners: {};
    path: [
        "src",
        "canvasLogic"
    ];
    pathString: "src.canvasLogic";
    props: Record<string, unknown>;
    reducer: (state: any, action: any, fullState: any) => {
        tool: Tool;
    };
    reducers: {
        tool: (state: Tool, action: any, fullState: any) => Tool;
    };
    selector: (state: any) => {
        tool: Tool;
    };
    selectors: {
        tool: (state: any, props?: any) => Tool;
    };
    sharedListeners: {};
    values: {
        tool: Tool;
    };
    _isKea: true;
    _isKeaWithKey: true;
}