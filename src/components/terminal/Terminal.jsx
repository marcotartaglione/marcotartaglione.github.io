import React, { useEffect, useRef } from "react";
import style from './Terminal.module.css';
import { useTerminal } from "../../contexts/terminal/TerminalContext";
import { Booting } from "../../boot/Booting";

export function Terminal({ children }) {
    const terminalData = useTerminal();
    const ref = useRef(null);
    const clickPerformer = useRef(null);

    useEffect(() => {
        if (ref.current) {
            requestAnimationFrame(() => {
                ref.current.scrollIntoView({ behavior: "smooth" });
            });
        }
    }, [terminalData.lines]);

    useEffect(() => {
        if (clickPerformer.current) {
            clickPerformer.current.dispatchEvent(
                new MouseEvent("mouseup", { bubbles: false })
            );
        }
    }, [terminalData.lines]);

    return (
        <>
            <div className={style.containerMobile}>
                <p>Hi there!</p>
                <p style={{ fontSize: "1rem", paddingBottom: "50px" }}>
                    For the best experience, please visit this website on your PC
                </p>
                <p>-M. Tartaglione</p>
            </div>
            <div className={style.container} ref={ref}>
                <Booting />
                <div ref={clickPerformer} />
                {terminalData.lines.map((item, index) => (
                    <React.Fragment key={index}>
                        {item}
                    </React.Fragment>
                ))}
                {terminalData.isActive && children}
            </div>
        </>
    );
}
