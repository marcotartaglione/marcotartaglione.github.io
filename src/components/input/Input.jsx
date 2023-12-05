import styles from "./Input.module.css";
import {useEffect, useRef, useState} from "react";
import {useTerminal} from "../../contexts/TerminalContext";
import {useCommand} from "../../contexts/CommandsContext";

export function Input() {
    const [inputValue, setInputValue] = useState("");

    const ref = useRef();

    const terminal = useTerminal();
    const command = useCommand();

    const prefix = "(./) >\u00A0";

    useEffect(() => {
        const setFocus = () => {
            ref.current.focus();
        };

        const handleClick = (e) => {
            if (!ref.current.contains(e.target)) {
                setFocus();
            }
        };

        window.addEventListener("focus", setFocus);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("focus", setFocus);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    const triggerCommand = (data) => {
        terminal.addLine(...command.call(data[0], data.slice(1)));
    }

    const onKeyDown = (e) => {
        // eslint-disable-next-line default-case
        switch (e.key) {
            case "Enter":
                e.preventDefault();
                terminal.addLine(prefix + inputValue);
                triggerCommand(inputValue.split(" "));
                setInputValue("");
                break;
            case "ArrowUp":
                e.preventDefault();
                break;
            case "ArrowDown":
                e.preventDefault();
                break;
            case "ArrowLeft":
            case "ArrowRight":
                e.preventDefault();
                break;
            case "Tab":
                e.preventDefault();
                break;
        }
    }

    return (
        <table className={styles.container}>
            <tbody>
                <tr>
                    <td>{prefix.replace(" ", "\u00A0")}</td>
                    <td><input ref={ref} className={styles.input} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={onKeyDown} /></td>
                </tr>
            </tbody>
        </table>
    )
}
