import {useFileSystem} from "../../contexts/fileSystem/FileSystem";
import {useEffect} from "react";

export function RemoveDirectory({args = []}) {
    const fileSystem = useFileSystem();

    useEffect(() => {
        fileSystem.rmdir(args[0]);
    }, []);

    return (
        <p>Removed</p>
    )
}

export const RemoveDirectoryData = {
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
    description: "Remove a directory",
    manual: "Remove the specified directory"
}
