import {createContext, useContext, useState} from "react";
import {useTerminal} from "../terminal/TerminalContext";

const FileSystem = createContext();

export function FileSystemProvider({ children }) {
    const fileSeparator = '/';

    const terminal = useTerminal();

    const [fileSystem, setFileSystem] = useState({
        elementName: '.',
        type: 'dir',
        children: [
            {
                elementName: 'guest',
                type: 'dir',
                children: [
                    {
                        elementName: 'social',
                        type: 'dir',
                        children: [
                            {
                                elementName: 'linkedin',
                                type: 'link'
                            },
                            {
                                elementName: 'instagram',
                                type: 'link'
                            }
                        ]
                    },
                    {
                        elementName: 'games',
                        type: 'dir',
                        children: [

                        ]
                    }
                ]
            }
        ]
    });

    const [currentPath, setCurrentPath] = useState("./guest/");

    const ls = (path) => {
        if (!path) path = currentPath;
        path = path[0];

        if (typeof path === "string")
            path = path.split(fileSeparator);

        if (path[0] !== '.')
            path = [...currentPath.split(fileSeparator), ...path];

        path = path.filter(item => item !== '');

        let currentDir = fileSystem;
        for (let i = 1; i < path.length; i++) {
            let temp = currentDir.children.find(item => item.elementName.toLowerCase() === path[i].toLowerCase())

            if (!temp) {
                console.log(path)
                terminal.warning(`Path '${path.join('/')}' not found`);
                return null;
            }

            currentDir = temp;
        }

        return currentDir.children;
    }

    return (
        <FileSystem.Provider value={{ currentPath: currentPath, ls: ls }}>
            {children}
        </FileSystem.Provider>
    )
}

export const useFileSystem = () => useContext(FileSystem);
