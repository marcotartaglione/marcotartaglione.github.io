import {useFileSystem} from "../../contexts/fileSystem/FileSystem";
import {useEffect, useState} from "react";

export function DirectoryContent() {
    const [data, setData] = useState({});

    const fileSystem = useFileSystem();

    useEffect(() => {
        setData(fileSystem.ls());
    }, []);

    return (
        <table>
            <tbody>
            {
                data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.elementName}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export const DirectoryContentData = {
    args: [
        {
            name: "<path>",
            type: "string",
            length: {
                min: 0,
                max: 1
            }
        }
    ],
    description: "Prints directory content",
    manual: "Prints all the files/links/directory in the specified path"
}
