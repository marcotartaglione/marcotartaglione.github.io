import style from './Terminal.module.css';
import {useTerminal} from "../../contexts/terminal/TerminalContext";

export function Terminal({children}) {
    const terminalData = useTerminal();

    return (
        <div className={style.container}>
            {terminalData.lines.map((item, index) => item)}
            {children}
        </div>
    )
}
