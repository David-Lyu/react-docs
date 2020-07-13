import React, { useState, useRef } from 'react';

// export default function App() {
//     const [isPlaying,setIsPlaying] = useState(false);
//     let time = 0;
//     time = useTimer(time, isPlaying)

//     function handleClick() {
//         setIsPlaying(prevPlay => !prevPlay)
//     }

//     return (
//         <div className="container">
//             <div className="stop-watch-container">
//                 <div className="number">{time}</div>
//             </div>
//             <h1 onClick={handleClick}>
//                 {isPlaying && "stop" || "start"}
//             </h1>
//         </div>
//     )
// }

// function useTimer(initialVal, isPlaying) {
//     const [time, setTime] = useState(initialVal);
//     debugger
//     let timer = null;
//     console.log(isPlaying,timer)
//     useEffect(() => {
//         if(isPlaying && !timer) {
//             timer = setInterval(()=> {
//                 setTime(prevTime => prevTime + 1)
//             }, 1000)
//         } else {
//             clearInterval(timer)
//         }
//     })
//     return time
// }


export default function App() {
    const [playOnClick, setPlayOnClick] = useState(false);
    const [timer, setTimer] = useState(0);
    const [playClass, setPlayClass] = useState("");
    const timerInterval = useRef();


    function handleClick(event) {
        if (event.target.className.indexOf("timer") !== -1 && !playOnClick) {
            setTimer(0)
        }
        if (event.target.className.indexOf("play") !== -1) {
            timerInterval.current = setInterval(() => {
                setTimer(prevTime => prevTime + 1)
            }, 1000);
            setPlayOnClick(true);
            setPlayClass('hidden');
        }
        if (event.target.className.indexOf('pause') !== -1) {
            clearInterval(timerInterval.current);
            setPlayOnClick(false);
            setPlayClass("");
        }
    }

    return (
        <div onClick={handleClick} className={'container'}>
            <div className={'timer stuff stuff'}>{timer}</div>
            {
                (
                    !playClass &&
                    <i className={'play fas fa-play fa-3x'}></i>
                ) ||
                <i className={'fas fa-pause pause fa-3x'}></i>
            }
        </div>
    )
}