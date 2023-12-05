import { createContext, useContext } from "react";

const CommandsContext = createContext();

export const CommandsContextProvider = ({ children }) => {
    const commands = {};

    const executeCommand = (command, args) => {
        const Component = Object.keys(commands).reduce((result, key) => {
            if (key.toLowerCase() === command.toLowerCase()) {
                result = commands[key];
            }
            return result;
        }, null);

        if (Component)
            return <Component args={args} />
        return[`Comando '${command}' non esistente`, "red"];
    };

    return (
        <CommandsContext.Provider value={{ call: executeCommand }}>
            {children}
        </CommandsContext.Provider>
    );
};

export const useCommand = () => useContext(CommandsContext);
