import {useEffect, useState} from "react";
import style from "./Help.module.css";
import {useCommands} from "../../../contexts/commands/CommandsContext";

export function Help() {
    const [commandsList, setCommandsList] = useState([]);

    const commands = useCommands();

    useEffect(() => {
        setCommandsList(commands.list);
    }, [commands]);

    return (
        <table>
            <thead className={style.thead}>
            <tr>
                <td>Command</td>
                <td>Arguments</td>
                <td>Description</td>
            </tr>
            </thead>
            <tbody className={style.tbody}>
            {
                Object.keys(commandsList).map((item, index) =>
                    <tr key={index}>
                        <td>{item}</td>
                        <td className={style["arguments"]}>
                            <ul style={{listStyle: "none"}}>
                                {
                                    commandsList[item].data?.args?.map((arg, index) =>
                                        <li key={index}>
                                            {arg.length.max > 1 ? '[' : ''}{arg.name}{arg.length.min === 0 ? '?' : ''}{arg.length.max > 1 ? ', ...]' : ''}
                                        </li>
                                    )
                                }
                            </ul>
                        </td>
                        <td>{commandsList[item].data?.description || "No description available"}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    )
}

export const HelpData = {
    args: [],
    description: "Shows current list",
    manual: "Shows the list of all the commands the terminal che run"
}

