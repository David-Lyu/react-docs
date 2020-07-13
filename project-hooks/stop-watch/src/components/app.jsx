import React, { useState, useRef, useEffect } from 'react';

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [resetTimer, setResetTimer] = useState(false)
    let time = 0;
    time = useTimer(time, isPlaying, resetTimer)

    function handleStartClick() {
        setIsPlaying(prevPlay => !prevPlay)
    }

    function handleTimerClick() {
        setResetTimer(prevRestVal => !prevRestVal)
    }

    return (
        <div className="container">
            <div onClick={handleTimerClick} className="stop-watch-container">
                <div className="number">{time}</div>
            </div>
            <h1 onClick={handleStartClick}>
                {isPlaying && "stop" || "start"}
            </h1>
        </div>
    )
}

function useTimer(initialVal, isPlaying, resetTimer) {
    console.log(isPlaying)
    const [time, setTime] = useState(initialVal);
    useEffect(() => {
        if(resetTimer && !isPlaying) {
            setTime(0);
        }
    })
    let timer = useRef();
    console.log(timer)
    if (isPlaying && !timer.current) {
        timer.current = setInterval(() => {
            setTime(prevTime => prevTime + 1)
        }, 1000)
    }
    if (!isPlaying) {
        clearInterval(timer.current)
        timer.current = null;
    }
    return time
}


// export default function App() {
//     const [playOnClick, setPlayOnClick] = useState(false);
//     const [timer, setTimer] = useState(0);
//     const [playClass, setPlayClass] = useState("");
//     const timerInterval = useRef();


//     function handleClick(event) {
//         if (event.target.className.indexOf("timer") !== -1 && !playOnClick) {
//             setTimer(0)
//         }
//         if (event.target.className.indexOf("play") !== -1) {
//             timerInterval.current = setInterval(() => {
//                 setTimer(prevTime => prevTime + 1)
//             }, 1000);
//             setPlayOnClick(true);
//             setPlayClass('hidden');
//         }
//         if (event.target.className.indexOf('pause') !== -1) {
//             clearInterval(timerInterval.current);
//             setPlayOnClick(false);
//             setPlayClass("");
//         }
//     }

//     return (
//         <div onClick={handleClick} className={'container'}>
//             <div className={'timer stuff stuff'}>{timer}</div>
//             {
//                 (
//                     !playClass &&
//                     <i className={'play fas fa-play fa-3x'}></i>
//                 ) ||
//                 <i className={'fas fa-pause pause fa-3x'}></i>
//             }
//         </div>
//     )
// }