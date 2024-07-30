import {useEffect, useState} from "react";
import {useFileSystem} from "../../contexts/fileSystem/FileSystem";

export function Open(args = []) {
    const fileSystem = useFileSystem();
    const [content, setContent] = useState();

    useEffect(() => {
        setContent(() => {
            let link = fileSystem.content(args.args[0])

            if (link === null || link === undefined)
                return "Path is missing, empty or a directory";

            setTimeout(() => window.open(link), 0);
            return link;
        });
    }, []);

    return (
        <p>{content}</p>
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
    description: "Open link",
    manual: "Open the specified link in a new browser tab"
}
