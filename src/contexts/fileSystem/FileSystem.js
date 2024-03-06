import {createContext, useContext, useState} from "react";

const FileSystem = createContext();

const FileSystemElementTypes = Object.freeze({
    DIRECTORY: 'dir',
    LINK: 'link'
})

export function FileSystemProvider({ children }) {
    const fileSeparator = '/';

    const [fileSystem, setFileSystem] = useState({
        elementName: '.',
        type: FileSystemElementTypes.DIRECTORY,
        children: [
            {
                elementName: 'guest',
                type: FileSystemElementTypes.DIRECTORY,
                children: [
                    {
                        elementName: 'social',
                        type: FileSystemElementTypes.DIRECTORY,
                        children: [
                            {
                                elementName: 'linkedin',
                                type: FileSystemElementTypes.LINK,
                                content: "https://www.linkedin.com/in/marco-tartaglione-b9a02623b/"
                            },
                            {
                                elementName: 'instagram',
                                type: FileSystemElementTypes.LINK,
                                content: "https://www.instagram.com/tartaglione.marco_/"
                            }
                        ]
                    },
                    {
                        elementName: 'games',
                        type: FileSystemElementTypes.DIRECTORY,
                        children: [

                        ]
                    }
                ]
            }
        ]
    });

    const [currentPath, setCurrentPath] = useState("./guest/social");

    const fixPath = (path, defaultValue = null) => {
        if (Array.isArray(path)) {
            path = path.join(fileSeparator);
        }

        if ((!path || path.length === 0) && defaultValue) {
            path = defaultValue;
        }
        else if ((!path || path.length === 0) && !defaultValue) {
            return null;
        }

        path = path.split(fileSeparator);

        if (path[0] !== '.') {
            path = [...currentPath.split(fileSeparator), ...path];
        }

        for (let i = 1; i < path.length; i++) {
            if (path[i] === '..') {
                path[i - 1] = '';
                path[i] = '';
            }
        }

        path = path.filter(item => item !== '');

        return path;
    };

    const isDir = (path) => {
        path = fixPath(path);
        if (!path) return false;

        if (!exists(path)) {
            return false;
        }

        if (path.length === 1) return true;

        let currentDir = fileSystem;
        for (let i = 1; i < path.length; i++) {
            currentDir = currentDir.children.find(item => item.elementName.toLowerCase() === path[i].toLowerCase())

            if (currentDir.type !== FileSystemElementTypes.DIRECTORY) {
                return false;
            }
        }

        return true;
    }

    const exists = (path) => {
        path = fixPath(path);
        if (!path) return false;

        let currentDir = fileSystem;
        for (let i = 1; i < path.length; i++) {
            const elementName = path[i].toLowerCase();
            const temp = currentDir.children.find(item => item.elementName.toLowerCase() === elementName);

            if (!temp) {
                return false;
            }

            currentDir = temp;
        }

        return true;
    }

    const ls = (path) => {
        path = fixPath(path, currentPath);

        if (!exists(path)) {
            return undefined;
        }

        let currentDir = fileSystem;
        for (let i = 1; i < path.length; i++) {
            currentDir = currentDir.children.find(item => item.elementName.toLowerCase() === path[i].toLowerCase())
        }

        return currentDir.children;
    }

    const cd = (path) => {
        path = fixPath(path);
        if (exists(path) && isDir(path)) {
            setCurrentPath(path.join(fileSeparator));
            return true;
        }
        return false;
    }

    const content = (path) => {
        path = fixPath(path, currentPath);

        if (!exists(path)) {
            return null;
        }

        let currentDir = fileSystem;
        for (let i = 1; i < path.length; i++) {
            currentDir = currentDir.children.find(item => item.elementName.toLowerCase() === path[i].toLowerCase())
        }

        return currentDir.content;
    }

    return (
        <FileSystem.Provider value={{ currentPath: currentPath, ls: ls, cd: cd, content: content }}>
            {children}
        </FileSystem.Provider>
    )
}

export const useFileSystem = () => useContext(FileSystem);
