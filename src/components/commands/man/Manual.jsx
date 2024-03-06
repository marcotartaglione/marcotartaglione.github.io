import {useEffect, useState} from "react";
import {useCommands} from "../../../contexts/commands/CommandsContext";

import style from "../help/Help.module.css";

export function Manual({args = []}) {
    const [description, setDescription] = useState();

    const commands = useCommands();

    useEffect(() => {
        setDescription(commands.list[args[0]]);
    }, [args, commands]);

    return (
        <>
            {
                description ?
                    <table>
                        <thead className={style.thead}>
                        <tr>
                            <td>Name</td>
                            <td>Arguments</td>
                            <td>Short description</td>
                            <td>Manual Description</td>
                        </tr>
                        </thead>
                        <tbody className={style.tbody}>
                        <tr>
                            <td>{args[0]}</td>
                            <td className={style["arguments"]}>
                                <ul style={{listStyle: "none"}}>
                                    {
                                        description.data?.args?.map((arg, index) =>
                                            <li key={index}>
                                                {arg.length.max > 1 ? '[' : ''}{arg.name}{arg.length.min === 0 ? '?' : ''}{arg.length.max > 1 ? ', ...]' : ''}
                                            </li>
                                        )
                                    }
                                </ul>
                            </td>
                            <td>{description.data?.description || "No description available"}</td>
                            <td>{description.data?.manual || "No description available"}</td>
                        </tr>
                        </tbody>
                    </table>
                    :
                    <p>Command not found</p>
            }
        </>
    )
}

export const ManualData = {
    args: [
        {
            name: "<command>",
            type: "string",
            length: {
                min: 1,
                max: 1
            }
        }
    ],
    description: "Shows command use",
    manual: "Shows the extended use manual for the specified command"
}
