import {useEffect} from "react";
import {useTerminal} from "../../contexts/terminal/TerminalContext";

export function ClearScreen() {
    const terminal = useTerminal();

    useEffect(() => {
        terminal.clear();
    }, [terminal]);

    return <></>
}

export const ClearScreenData = {
    args: [],
    description: "Clear the screen",
    manual: "When called removes all lines currently visible on the terminal"
}

