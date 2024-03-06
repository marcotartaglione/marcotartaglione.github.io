import {useFileSystem} from "../../../contexts/fileSystem/FileSystem";
import {useEffect} from "react";

export function ChangeDirectory({args = []}) {
    const fileSystem = useFileSystem();

    useEffect(() => {
        fileSystem.cd(args[0]);
    }, [args, fileSystem]);

    return (
        <></>
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
    description: "Moves to specified directory",
    manual: "Moves the current location to the specified one"
}
