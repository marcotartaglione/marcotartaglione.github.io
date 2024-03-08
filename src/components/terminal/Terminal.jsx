import React, {useRef} from "react";
import style from './Terminal.module.css';
import {useTerminal} from "../../contexts/terminal/TerminalContext";
import {Booting} from "../../boot/Booting";

export function Terminal({children}) {
    const terminalData = useTerminal();

    const ref = useRef();

    return (
        <div className={style.container} ref={ref}>
            <Booting/>
            {terminalData.lines.map((item, index) =>
                <React.Fragment key={index}>
                    {item}
                </React.Fragment>)}
            {terminalData.isActive && children}
        </div>
    )
}
