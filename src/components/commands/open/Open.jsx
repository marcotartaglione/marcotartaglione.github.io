import {useEffect, useState} from "react";
import {useFileSystem} from "../../../contexts/fileSystem/FileSystem";

// TODO: capire perchè args è un { } invece che un [ ]
export function Open(args = []) {
    const fileSystem = useFileSystem();
    const [content, setContent] = useState();

    useEffect(() => {
        setContent(() => {
            let link = fileSystem.content(args.args[0])
            window.open(link);
            return link;
        });
    }, []);

    return (
        <p>{content ? "Aprendo..." : "Path is missing, empty or a directory"}</p>
    )
}

export const OpenData = {
    args: [
        {
            name: "<link>",
            type: "string",
            length: {
                min: 1,
                max: 1
            }
        }
    ],
    description: "Opens link",
    manual: "Opens the specified link in a new browser tab"
}
