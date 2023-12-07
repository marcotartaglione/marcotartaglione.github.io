import React, { useEffect, useRef, useState } from "react";
import styles from "./Input.module.css";
import { useTerminal } from "../../contexts/terminal/TerminalContext";
import { useCommands } from "../../contexts/commands/CommandsContext";
import {useFileSystem} from "../../contexts/fileSystem/FileSystem";

export function Input() {
    const [inputValue, setInputValue] = useState("");

    const ref = useRef();
    const terminal = useTerminal();
    const commands = useCommands();
    const fileSystem = useFileSystem();

    const [prefix, setPrefix] = useState("");

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

    useEffect(() => {
        setPrefix(`(${fileSystem.currentPath}) >\u00A0`);
    }, [fileSystem])

    const triggerCommand = (data) => {
        try {
            if (data[0].length === 0) return;
            commands.execute(data[0], data.slice(1));
        }
        catch (e) {
            terminal.error("Fatal error. Check console log");
            console.log(e)
        }
    };

    const onKeyDown = (e) => {
        // eslint-disable-next-line default-case
        switch (e.key) {
            case "Enter":
                e.preventDefault();
                terminal.print(prefix + inputValue);
                triggerCommand(inputValue.split(" "));
                setInputValue("");
                break;
            case "ArrowUp":
                e.preventDefault();
                setInputValue(commands.lastCommand);
                break;
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
            case "Tab":
                e.preventDefault();
                break;
        }
    };

    return (
        <div className={styles.container}>
            <div style={{ display: "flex" }}>
                <div>{  prefix.replace(" ", "\u00A0")}</div>
                <div style={{ flex: 1 }}>
                    <textarea
                        ref={ref}
                        className={styles.input}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}
