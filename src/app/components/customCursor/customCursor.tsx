"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Position {
    x: number;
    y: number;
}


const CustomCursor = () => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [hovering, setHovering] = useState<boolean>(false);

    useEffect(() => {

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };


        const handleHoverChange = (e: CustomEvent<boolean>) => {
            setHovering(e.detail);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("cursorHover", handleHoverChange as EventListener);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("cursorHover", handleHoverChange as EventListener);
        };
    }, []);

    return (
        <motion.div
            className=" fixed top-0 left-0 pointer-events-none z-50"
            animate={{
                x: position.x - 10,
                y: position.y - 10,
                scale: hovering ? 2.5 : 1,
                backgroundColor: hovering ? "#FF5733" : "rgba(255, 87, 51, 0.3)",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
            }}
        />
    );
};

export const useCustomCursor = () => {
    const onMouseEnter = () =>
        document.dispatchEvent(new CustomEvent("cursorHover", { detail: true }));
    const onMouseLeave = () =>
        document.dispatchEvent(new CustomEvent("cursorHover", { detail: false }));

    return { onMouseEnter, onMouseLeave };
};

export default CustomCursor;
