import React, {useRef} from "react";
import style from './Terminal.module.css';
import {useTerminal} from "../../contexts/terminal/TerminalContext";
import {Booting} from "../../boot/Booting";

export function Terminal({children}) {
    const terminalData = useTerminal();
    const ref = useRef(null);

    return (
        <>
            <div className={style.containerMobile}>
                <p>Hi there!</p>
                <p style={{fontSize: "1rem", paddingBottom: "50px"}}>For the best experience, please visit this website on your PC</p>
                <p>-M. Tartaglione</p>
            </div>
            <div className={style.container} ref={ref}>
            <Booting/>
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
