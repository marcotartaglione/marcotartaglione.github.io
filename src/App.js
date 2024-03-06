import './App.css';
import { Terminal } from "./components/terminal/Terminal";
import { TerminalContextProvider } from "./contexts/terminal/TerminalContext";
import { Input } from "./components/input/Input";
import { CommandsContextProvider } from "./contexts/commands/CommandsContext";
import { FileSystemProvider } from "./contexts/fileSystem/FileSystem";

function App() {
    return (
        <div className="App">
            <TerminalContextProvider>
                <FileSystemProvider>
                    <CommandsContextProvider>
                        <Terminal>
                            <Input />
                        </Terminal>
                    </CommandsContextProvider>
                </FileSystemProvider>
            </TerminalContextProvider>
        </div>
    );
}

export default App;
