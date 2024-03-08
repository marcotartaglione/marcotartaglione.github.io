import React, {useEffect, useState} from "react";
import bootingContent from "./BootingContent";
import {useTerminal} from "../contexts/terminal/TerminalContext";

export function Booting() {
    const [content, setContent] = useState([]);
    const [completedTimeouts, setCompletedTimeouts] = useState(0);

    const terminal = useTerminal();

    useEffect(() => {
        terminal.deActivate();

        let currentIndex = 0;
        let timeSum = 0;
        const timeouts = [];

        while (currentIndex < bootingContent.length) {
            const currentTimeSum = timeSum;
            const currentItem = bootingContent[currentIndex];
            const timeout = setTimeout(() => {
                setContent(prevContent => [...prevContent, currentItem.string]);
                setCompletedTimeouts(prev => prev + 1);
            }, currentTimeSum + (currentItem.time || 500));
            timeouts.push(timeout);

            timeSum += currentItem.time || 100;
            currentIndex++;
        }

        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, []);

    useEffect(() => {
        if (completedTimeouts === bootingContent.length) {
            terminal.activate();
        }
    }, [completedTimeouts, terminal]);

    return (
        <>
            {content.map((item, index) => (
                item ? (
                    item.startsWith("http") ? (
                        <a href={item} key={index} target="_blank">{item}</a>
                    ) : (
                        <p dangerouslySetInnerHTML={{__html: item}} key={index} />
                    )
                ) : (
                    <br key={index} />
                )
            ))}
        </>

    );
}
