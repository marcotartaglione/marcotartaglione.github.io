import './App.css';
import {Terminal} from "./components/terminal/Terminal";
import {TerminalContextProvider} from "./contexts/TerminalContext";
import {Input} from "./components/input/Input";
import {CommandsContextProvider} from "./contexts/CommandsContext";

function App() {
    return (
        <div className="App">
            <TerminalContextProvider>
                <CommandsContextProvider>
                    <Terminal>
                        <Input/>
                    </Terminal>
                </CommandsContextProvider>
            </TerminalContextProvider>
        </div>
    );
}

export default App;
