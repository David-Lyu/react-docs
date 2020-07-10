import React, { useState, useEffect } from 'react';

export default function App() {
    let isPlaying = false;
    let time = useTimer(0)

    function handleClick() {
        isPlaying = usePlaying(isPlaying)
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

function usePlaying(initialVal) {
    return !initialVal
}

function useTimer(initialVal, isPlaying) {
    console.log(isPlaying)
    const [time, setTime] = useState(initialVal);
    let timer = null;
    if(isPlaying) {
        timer = setInterval(()=> {
            setTime(prevTime => prevTime + 1)
        }, 1000)
    } else (
        clearInterval(timer)
    )
    return time;
}