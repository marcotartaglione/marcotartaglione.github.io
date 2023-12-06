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

    const convertPath = (path) => {
        if (typeof path === typeof []) {
            return path.join(fileSeparator);
        } else if (typeof path === 'string') {
            return path.split(fileSeparator);
        } else {
            return null;
        }
    }

    const findDirectory = (currentDir, folderName) => {
        return currentDir.children.find(item => item.elementName.toLowerCase() === folderName.toLowerCase());
    }

    const lsRecursive = (currentDir, path) => {
        if (path.length === 0) {
            return currentDir.children;
        } else {
            const nextFolderName = path[0];
            const nextFolder = findDirectory(currentDir, nextFolderName);

            if (nextFolder && nextFolder.type === 'dir') {
                return lsRecursive(nextFolder, path.slice(1));
            } else {
                return null;
            }
        }
    }

    const ls = (path) => {
        if (!path) path = currentPath;

        if (typeof path === "string")
            path = convertPath(path);
        const dir = lsRecursive(fileSystem, path);

        if (!dir) {
            terminal.warning(`${path.join(fileSystem)} not found`);
            return null;
        }

        return dir;
    }

    return (
        <FileSystem.Provider value={{ currentPath: currentPath, ls: ls }}>
            {children}
        </FileSystem.Provider>
    )
}

export const useFileSystem = () => useContext(FileSystem);
