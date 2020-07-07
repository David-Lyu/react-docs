import React, { useState } from 'react';

export default function App() {
    const [counter, setCounter] = useState(0)
    const color = getColor(counter)
    console.log(counter)
    return <button style={color} onClick={()=> { setCounter(prevCount => prevCount + 1)}}>HotButton</button>
}

function getColor(counter) {
    const bg ={backgroundColor: ""};
    const colors = ['purple','fuchsia','red','orange','yellow','white'];
    if(counter === 0) {
        bg.backgroundColor = "none"
        return bg
    }
    if(counter >= colors.length * 3){
        bg.backgroundColor = colors[colors.length - 1
        ]
    } else {
        bg.backgroundColor = colors[Math.floor(counter/3)]
    }
    return bg
}