import {createContext, useContext, useState} from "react";

const TerminalContext = createContext();

const lineData = {
    content: "Linea di esempio",
    color: "",
}

const generateLineData = (content, color) => {
    return {
        content: content,
        color: color || "",
    }
}

export const TerminalContextProvider = ({children}) => {
    const [lines, setLines] = useState([]);

    const addLine = (content, color = null) => {
        if (!content || typeof content != 'string') return null;
        if (color !== null && typeof color != 'string') return null;

        setLines(old => [...old, generateLineData(content, color)]);
    }

    return (
        <TerminalContext.Provider value={{lines: lines, addLine: addLine}}>
            {children}
        </TerminalContext.Provider>
    )
}

export const useTerminal = () => useContext(TerminalContext);
