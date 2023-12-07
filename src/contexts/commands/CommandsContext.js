import {createContext, useContext, useState} from "react";
import {ClearScreen, ClearScreenData} from "../../components/commands/cls/ClearScreen";
import {useTerminal} from "../terminal/TerminalContext";
import {Echo, EchoData} from "../../components/commands/echo/Echo";
import {DirectoryContent, DirectoryContentData} from "../../components/commands/ls/DirectoryContent";
import {Help} from "../../components/commands/help/Help";

const CommandsContext = createContext();

const list = {
    help: {
        component: Help,
        data: {
            args: [],
            description: "Shows current list",
            manual: "Show the list of all available command and their arguments"
        }
    },
    cls: {
        component: ClearScreen,
        data: ClearScreenData
    },
    echo: {
        component: Echo,
        data: EchoData
    },
    ls: {
        component: DirectoryContent,
        data: DirectoryContentData
    }
}

export function CommandsContextProvider({children}) {
    // eslint-disable-next-line no-unused-vars
    const [commands, _] = useState(list);

    const terminal = useTerminal();
    const [lastCommand, setLastCommand] = useState("");

    const checkArguments = (args, commandData) => {
        if (!commandData || commandData.length === 0) return true;

        if (args.length === 0 && commandData[0].length.min === 0) return true;

        let commandDataIndex = 0,
            currentArgOccurrences = 0,
            areArgsInfinite = false,
            areArgsOptional = false;

        for (let i = 0; i < args.length && commandDataIndex < commandData.length; i++) {
            if (typeof args[i] !== commandData[commandDataIndex].type) return false;
            currentArgOccurrences++;

            if (!areArgsInfinite && commandData[commandDataIndex].length.max === Infinity)
                areArgsInfinite = true;
            if (!areArgsOptional && commandData[commandDataIndex].length.min === 0)
                areArgsOptional = true;
            if (currentArgOccurrences === commandData[commandDataIndex].length.max)
                commandDataIndex++;
        }

        return commandDataIndex >= commandData.length.min || areArgsInfinite || areArgsOptional;
    }

    const execute = (command, args) => {
        setLastCommand(command + " " + args.join(" "));
        const component = list[command];

        if (!component) {
            terminal.warning(`Command '${command}' not found.\nUse 'HELP' for commands list`);
            return;
        }

        if (component.data?.args && !checkArguments(args, component.data.args)) {
            terminal.error("Missing parameters. Check command manual via 'man' command");
            return;
        }

        terminal.print(component.component, args);
    }

    return (
        <CommandsContext.Provider value={{list: commands, lastCommand: lastCommand, execute: execute}}>
            {children}
        </CommandsContext.Provider>
    )
}

export const useCommands = () => useContext(CommandsContext);
