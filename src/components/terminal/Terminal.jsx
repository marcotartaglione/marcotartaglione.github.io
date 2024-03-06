import React, {useEffect, useRef} from "react";
import style from './Terminal.module.css';
import {useTerminal} from "../../contexts/terminal/TerminalContext";

export function Terminal({children}) {
    const terminalData = useTerminal();

    const ref = useRef();

    return (
        <div className={style.container} ref={ref}>
            {terminalData.lines.map((item, index) =>
                <React.Fragment key={index} >
                    {item}
                </React.Fragment>)}
            {children}
        </div>
    )
}
