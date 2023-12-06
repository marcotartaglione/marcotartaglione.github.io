import {createContext, useContext} from "react";
import {ClearScreen, ClearScreenData} from "../../components/commands/ClearScreen";
import {useTerminal} from "../terminal/TerminalContext";
import {Echo, EchoData} from "../../components/commands/Echo";
import {DirectoryContent, DirectoryContentData} from "../../components/commands/DirectoryContent";

const CommandsContext = createContext();

const Help = () => {
    return (
        <table>
            <tbody>
            {
                Object.keys(list).map((item, index) =>
                    <tr key={index}>
                        <td>{item}</td>
                        <td style={{padding: "0 25px"}}>
                            <ul style={{listStyle: "none"}}>
                                {
                                    list[item].data?.args?.map((arg, index) =>
                                        <li key={index}>
                                            {arg.length.max > 1 ? '[' : ''}{arg.name}{arg.length.min === 0 ? '?' : ''}{arg.length.max > 1 ? ', ...]' : ''}
                                        </li>
                                    )
                                }
                            </ul>
                        </td>
                        <td style={{paddingRight: "25px"}}>:</td>
                        <td>{list[item].data?.description || "No description available"}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    )
}

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
    const terminal = useTerminal();

    const checkArguments = (args, commandData) => {
        if (!commandData || commandData.length === 0) return true;

        console.log(args)

        let commandDataIndex = 0,
            currentArgOccurrences = 0,
            areArgsInfinite = false,
            areArgsOptional = false;

        for (let i = 0; i < args.length && currentArgOccurrences < commandData.length; i++) {
            if (typeof args[i] !== commandData[commandDataIndex].type) return false;
            currentArgOccurrences++;

            if (currentArgOccurrences === commandData[commandDataIndex].length.max)
                commandDataIndex++;
            if (!areArgsInfinite && commandData[commandDataIndex].length.max === Infinity)
                areArgsInfinite = true;
            if (!areArgsOptional && commandData[commandDataIndex].length.min === 0)
                areArgsOptional = true;
        }

        console.log(commandDataIndex, commandData.length.min, areArgsInfinite);

        return commandDataIndex >= commandData.length.min || areArgsInfinite || areArgsOptional;
    }

    const execute = (command, args) => {
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
        <CommandsContext.Provider value={{execute: execute}}>
            {children}
        </CommandsContext.Provider>
    )
}

export const useCommands = () => useContext(CommandsContext);
