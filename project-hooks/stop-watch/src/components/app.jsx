import React, { useState, useEffect } from 'react';

export default function App() {
    const [isPlaying,setIsPlaying] = useState(false);
    let alreadyPlayed = false;
    let initialized  = useTimer(0, isPlaying, alreadyPlayed)
    alreadyPlayed = initialized.alreadyPlayed
    let time = initialized.time
    // console.log(alreadyPlayed)

    function handleClick() {
        setIsPlaying(prevPlay => !prevPlay)
    }
    // console.log(isPlaying, alreadyPlayed, time )

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

function useTimer(initialVal, isPlaying, alreadyPlayed) {
    console.log(alreadyPlayed)
    const [time, setTime] = useState(initialVal);
    let timer = null;
    if(isPlaying && !alreadyPlayed) {
        alreadyPlayed = true;
        timer = setInterval(()=> {
            setTime(prevTime => prevTime + 1)
        }, 1000)
    } else {
        alreadyPlayed = false;
        clearInterval(timer)
    }   
    return {
        time,
        alreadyPlayed
    }
}