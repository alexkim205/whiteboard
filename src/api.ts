import {CanvasDataUrl} from "./types";

export const api = {
    canvas: {
        save: async(id: number | undefined, dataUrl: CanvasDataUrl): Promise<CanvasDataUrl> => {
            // Mock save api
            // const response = await fetch(`/api/save/${id}`, {
            //     method: "POST",
            //     body: JSON.stringify({
            //         dataUrl
            //     })
            // })
            console.log(`[POST]: Canvas with id ${id} was saved successfully.`)
            return dataUrl
        },
        fetch: async(id: number | undefined): Promise<CanvasDataUrl> => {
            // Mock fetch api
            // const response = await fetch(`/api/save/${id}`, {
            //     method: "POST",
            //     body: JSON.stringify({
            //         dataUrl
            //     })
            // })
            console.log(`[GET]: Canvas with id ${id} was fetched successfully`)
            return ""
        }
    },
}