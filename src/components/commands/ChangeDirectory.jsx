import {useFileSystem} from "../../contexts/fileSystem/FileSystem";
import {useEffect, useState} from "react";

export function ChangeDirectory({args = []}) {
    const fileSystem = useFileSystem();
    const [content, setContent] = useState("");

    useEffect(() => {
        if(!fileSystem.cd(args[0]))
            setContent("Missing path")
    }, []);

    return (
        <>{content}</>
    )
}

export const ChangeDirectoryData = {
    args: [
        {
            name: "<path>",
            type: "string",
            length: {
                min: 1,
                max: 1
            }
        }
    ],
    description: "Move to specified directory",
    manual: "Move from the current location to the specified one"
}
