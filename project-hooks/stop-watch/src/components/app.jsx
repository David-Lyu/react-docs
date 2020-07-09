import React, { useState, useEffect } from 'react';

export default function App() {
    const [isPlaying,setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);

    function handleClick() {
        setIsPlaying(prev => !prev)
        console.log("isplaying1", isPlaying)
    let timer = null;
        if(isPlaying) {
            console.log("inside timer")
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000);
        } else {
            console.log("timer")
            clearInterval(timer)
        }
    }

    return (
        <div className="container">
            <div className="stop-watch-container">
                <div className="number">{time}</div>
            </div>
            <h1 onClick={handleClick}>
                {isPlaying && "stop" || "start"}
            </h1>
        </div>
    )
}