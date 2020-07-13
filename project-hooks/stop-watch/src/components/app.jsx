import React, { useState, useEffect } from 'react';

export default function App() {
    const [isPlaying,setIsPlaying] = useState(false);
    const [alreadyPlayed, setAlreadyPlayed] = useState(true)
    let time = 0;
    const timerInfo = useTimer(time, isPlaying, alreadyPlayed)
    console.log(timerInfo, alreadyPlayed)
    time = timerInfo.time
    
    if(timerInfo.alreadyPlayed) {
        setAlreadyPlayed(timerInfo.alreadyPlayed)
    }
    
    function handleClick() {
        setIsPlaying(prevPlay => !prevPlay)
        setAlreadyPlayed(prevPlayed => !prevPlayed)
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

function useTimer(initialVal, isPlaying, alreadyPlayed ) {
    const [time, setTime] = useState(initialVal);
    let timer = null;
    if(isPlaying && !alreadyPlayed) {
        alreadyPlayed = true;
        timer = setInterval(()=> {
            setTime(prevTime => prevTime + 1)
        }, 1000)
    } else {
        console.log(alreadyPlayed)
        alreadyPlayed = false;
        clearInterval(timer)
    }   
    return {
        time,
        alreadyPlayed
    }
}