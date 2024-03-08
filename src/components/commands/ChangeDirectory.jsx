import {useFileSystem} from "../../contexts/fileSystem/FileSystem";
import {useEffect} from "react";

export function ChangeDirectory({args = []}) {
    const fileSystem = useFileSystem();

    useEffect(() => {
        fileSystem.cd(args[0]);
    }, []);

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
    description: "Move to specified directory",
    manual: "Move from the current location to the specified one"
}
