import { useEffect, useState } from "react";

export const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    console.log("DOOOOO POSITION", position)

    useEffect(() => {
        const setFromEvent = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setFromEvent);

        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, []);

    return position;
};