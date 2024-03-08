import {createContext, useContext, useState} from "react";
import style from "./TerminalContext.module.css";

const TerminalContext = createContext();

export const TerminalContextProvider = ({children}) => {
    const [lines, setLines] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const generateOutput = (Content, args) => {
        if (typeof Content === 'string') {
            return <p>{Content}</p>
        } else {
            return <Content args={args}/>
        }
    }

    const sendOutput = (content, args, lineStyle = null) => {
        setLines((old) => [...old,
            <div className={lineStyle}>
                {generateOutput(content, args)}
            </div>
        ]);
    }

    const error = (content, args) => {
        sendOutput(content, args, style.error);
    }

    const warning = (content, args) => {
        sendOutput(content, args, style.warning);
    }

    const print = (content, args) => {
        sendOutput(content, args);
    }

    const clear = () => {
        setLines([]);
    }

    return (
        <TerminalContext.Provider
            value={{
                lines: lines,
                print: print,
                warning: warning,
                error: error,
                clear: clear,
                activate: () => setIsActive(true),
                deActivate: () => setIsActive(false),
                isActive: isActive
            }}
        >
            {children}
        </TerminalContext.Provider>
    )
}

export const useTerminal = () => useContext(TerminalContext);
