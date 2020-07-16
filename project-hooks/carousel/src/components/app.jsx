import React, { useState, useEffect } from 'react';

export default function App() {
    return (
        <div className = "contianer" >
            <Carousel/>
        </div>
    )
}

function Carousel() {
    const [counter, setCounter] = useState(0)
    const imgArr = createImg()

    useEffect(() => {
        const interval = setInterval( () => {
            if(counter >= imgArr.length) {
                setCounter(0)
            } else {
                setCounter( prev => prev + 1)
            }
        }, 1000)
    }, [])
    console.log(counter)
    return (
        <div>
            {imgArr[counter]}
        </div>
    )

}

function createImg() {
    const path = '../src/photos/'
    const imgPathArr = [path + 'pic1.jpg',path + 'pic2.jpg', path + 'pic3.jpg', path + 'pic4.jpg'];

    const imgArr = [];
    for(let i = 0; i < imgPathArr.length; i++) {
        imgArr.push(<img src={imgPathArr[i]} alt="sample pic"/>)
    }
    
    return imgArr
}