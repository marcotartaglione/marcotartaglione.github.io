import {createContext, useContext, useState} from "react";
import {ClearScreen, ClearScreenData} from "../../components/commands/ClearScreen";
import {useTerminal} from "../terminal/TerminalContext";
import {Echo, EchoData} from "../../components/commands/Echo";
import {DirectoryContent, DirectoryContentData} from "../../components/commands/ls/DirectoryContent";
import {Help, HelpData} from "../../components/commands/help/Help";
import {ChangeDirectory, ChangeDirectoryData} from "../../components/commands/ChangeDirectory";
import {Manual, ManualData} from "../../components/commands/Manual";
import {Open, OpenData} from "../../components/commands/Open";
import {MakeDirectory, MakeDirectoryData} from "../../components/commands/MakeDirectory";
import {RemoveDirectory, RemoveDirectoryData} from "../../components/commands/RemoveDirectory";

const CommandsContext = createContext();

const list = {
    help: {
        component: Help,
        data: HelpData
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
    },
    cd: {
        component: ChangeDirectory,
        data: ChangeDirectoryData
    },
    mkdir: {
        component: MakeDirectory,
        data: MakeDirectoryData
    },
    rmdir: {
        component: RemoveDirectory,
        data: RemoveDirectoryData
    },
    man: {
        component: Manual,
        data: ManualData
    },
    open: {
        component: Open,
        data: OpenData
    },
}

const checkArgumentsReturn = Object.freeze({
    VALID: 0,

    COMMAND_ERROR_START: 1,
    COMMAND_EXIDED_PARAMETERS_ITERATION_COUNT: 1,
    COMMAND_NON_FIRST_PARAMETER_HAS_MIN_0: 2,
    COMMAND_NON_LAST_PARAMETER_HAS_MAX_INFINITE: 3,
    COMMAND_NON_FIRST_PARAMETER_HAS_NO_FIXED_ELEMENTS_COUNT: 4,
    COMMAND_NON_ONLY_FIRST_PARAMETER_HAS_MAX_INFINITE: 5,
    COMMAND_ERROR_END: 99,

    PARAMETER_ERROR_START: 100,
    PARAMETER_MISSING: 100,
    PARAMETER_WRONG_TYPE: 101,
    PARAMETER_ERROR_END: 199,
})

export function CommandsContextProvider({children}) {
    // eslint-disable-next-line no-unused-vars
    const [commands, _] = useState(list);

    const terminal = useTerminal();
    const [lastCommand, setLastCommand] = useState("");

    const getErrorFromCode = (code) => {
        for (let key in checkArgumentsReturn) {
            if (checkArgumentsReturn[key] === code && !key.endsWith("_END") && !key.endsWith("_START")) {
                return key.replace("_", " ").toLowerCase();
            }
        }

        return "Non valid code";
    }

    const checkArguments = (args, commandData) => {
        if (!commandData || commandData.length === 0) return checkArgumentsReturn.VALID;
        if (args.length === 0 && commandData[0].length.min === 0) return checkArgumentsReturn.VALID;

        let currentCommandDataIndex = 0;
        let currentArgumentIndex = 0;

        const safetyCheck = 500;    // max number of iterations for while loop
        let   currentIteration = 0; // current iteration number
        while (currentCommandDataIndex < args.length) {
            if (++currentIteration >= safetyCheck) return checkArgumentsReturn.COMMAND_EXIDED_PARAMETERS_ITERATION_COUNT;

            // only the first parameter can have a min on 0
            if (commandData[currentCommandDataIndex].length.min === 0 && currentCommandDataIndex !== 0) return checkArgumentsReturn.COMMAND_NON_FIRST_PARAMETER_HAS_MIN_0;
            // only the last or first-and-only parameter can have an infinite as max
            if (commandData[currentCommandDataIndex].length.max === Infinity && currentCommandDataIndex !== commandData.length - 1 && commandData.length !== 1) return checkArgumentsReturn.COMMAND_NON_LAST_PARAMETER_HAS_MAX_INFINITE;
            if (commandData[currentCommandDataIndex].length.max === Infinity && currentCommandDataIndex !== 0 && commandData.length !== 1) return checkArgumentsReturn.COMMAND_NON_ONLY_FIRST_PARAMETER_HAS_MAX_INFINITE;
            // non-first parameters must have a fixed number of parameters
            if (commandData[currentCommandDataIndex].length.min !== commandData[currentCommandDataIndex].length.max && currentCommandDataIndex !== 0 && currentCommandDataIndex !== commandData.length - 1) return checkArgumentsReturn.COMMAND_NON_FIRST_PARAMETER_HAS_NO_FIXED_ELEMENTS_COUNT;

            // validity check
            if (typeof args[currentArgumentIndex] !== commandData[currentCommandDataIndex].type) return checkArgumentsReturn.PARAMETER_WRONG_TYPE;

            if (++currentArgumentIndex === commandData[currentCommandDataIndex].length.max) {
                currentArgumentIndex = 0;
                currentCommandDataIndex++;
            }

            if (currentArgumentIndex >= args.length || currentCommandDataIndex === commandData.length) break;
        }

        if (currentCommandDataIndex === commandData.length || commandData[0].length.max === Infinity) {
            return checkArgumentsReturn.VALID;
        } else {
            return checkArgumentsReturn.PARAMETER_MISSING;
        }
    }

    const execute = (command, args) => {
        setLastCommand(command + " " + args.join(" "));
        const component = list[command];

        if (!component) {
            terminal.warning(`Command '${command}' not found.\nUse 'HELP' for commands list`);
            return;
        }

        if (component.data?.args) {
            const value = checkArguments(args, component.data.args);

            if (checkArgumentsReturn.COMMAND_ERROR_START <= value && value <= checkArgumentsReturn.COMMAND_ERROR_END) {
                terminal.error(`This command contains an error [${command} - ${value}]. Report to Marco Tartaglione the code in brackets. Thank you ♥`);
                return;
            }
            if (checkArgumentsReturn.PARAMETER_ERROR_START <= value && value <= checkArgumentsReturn.PARAMETER_ERROR_END) {
                terminal.error(`Wrong parameter format [${getErrorFromCode(value)}]. Check manual executing 'man ${command}'`)
                return;
            }
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
