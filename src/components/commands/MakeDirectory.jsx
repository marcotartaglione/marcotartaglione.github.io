import {useEffect, useState} from "react";
import {useFileSystem} from "../../contexts/fileSystem/FileSystem";

export function MakeDirectory({args = []}) {
    const fileSystem = useFileSystem();

    const [result, setResult] = useState(true);

    useEffect(() => {
        setResult(fileSystem.mkdir(args[0]));
    }, []);

    return (
        <p>{!result && "Missing path"}</p>
    )
}

export const MakeDirectoryData = {
    args: [
        {
            name: "<name>",
            type: "string",
            length: {
                min: 1,
                max: 1
            }
        }
    ],
    description: "Create a directory",
    manual: "Create a new directory with the specified name"
}
