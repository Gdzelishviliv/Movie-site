"use client";
import React, { ReactNode } from "react";
import { useCustomCursor } from "./customCursor";


interface HoverWrapperProps {
    children: ReactNode;
}

const HoverWrapper = ({ children }:HoverWrapperProps) => {
    const { onMouseEnter, onMouseLeave } = useCustomCursor();

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </div>
    );
};

export default HoverWrapper;
