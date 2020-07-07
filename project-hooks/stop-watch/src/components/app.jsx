import React, { useState, useEffect } from 'react';

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const time = 0;

    return (
        <div className="container">
            <div className="stop-watch-container">
                <div className="number">{time}</div>
            </div>
            <h1 onClick={()=> {time = handleClick(isPlaying)}}>
                {isPlaying && "stop" || "start"}
            </h1>
        </div>
    )
}

function handleClick() {
    setIsPlaying(prevIsPlaying => !prevIsPlaying); 
    useGetTime(time)
}

function useGetTime(initialTime, isPlaying) {
    const [time,setTime] = useState(initialTime)
    let startTimerInterval = null;
    if(isPlaying) {
        useEffect(()=> {
            startTimerInterval = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000)
        })
    }
    if(!isPlaying) {
        clearInterval(startTimerInterval)
    }
    return time;
}