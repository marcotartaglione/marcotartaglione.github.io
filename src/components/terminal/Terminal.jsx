import style from './Terminal.module.css';
import {useTerminal} from "../../contexts/TerminalContext";

export function Terminal({children}) {
    const terminalData = useTerminal();

    return (
        <div className={style.container}>
            {
                terminalData.lines.map((item, index) => (
                    <p key={index} style={{color: item.color || ""}}>{item.content}</p>
                ))
            }
            {children}
        </div>
    )
}
