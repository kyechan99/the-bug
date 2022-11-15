import React from "react";
import './Road.scss';

interface RoadProps {
    children: React.ReactNode
}

export const Road = ({children} : RoadProps) =>
{
    return (
        <div className="road col">{children}</div>
    )
}