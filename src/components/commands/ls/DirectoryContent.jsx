import {useFileSystem} from "../../../contexts/fileSystem/FileSystem";
import {useEffect, useState} from "react";
import styles from "./DirectoryContent.module.css";

export function DirectoryContent({args = []}) {
    const [data, setData] = useState([]);

    const fileSystem = useFileSystem();

    useEffect(() => {
        setData(fileSystem.ls(args));
    }, []);

    return (
        <>
            {
                data?.length > 0 ?
                    <table>
                        <tbody>
                        {
                            data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={styles.typeColumn}>-{item.type}-</td>
                                        <td>{item.elementName}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                :
                data === undefined ?
                    <p>Path not found</p>
                    :
                    <p>Empty directory</p>
            }
        </>
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
