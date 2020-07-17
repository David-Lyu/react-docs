import React, { useState, useEffect, useRef } from 'react';

export default function App() {
    return (
        <div className="contianer" >
            <Carousel />
        </div>
    )
}

function Carousel() {
    const [counter, setCounter] = useState(0)
    const imgArr = createImg()
    const interval = useRef()

    useEffect(() => {
        interval.current = setInterval(() => {
            setCounter(prev => prev + 1)
        }, 3000)
    }, [])

    useEffect(() => {
        if (counter >= imgArr.length) {
            setCounter(0)
        }
        if (counter < 0) {
            setCounter(imgArr.length - 1)
        }
    }, [counter])

    return (
        <div className="container">
            <div className="back" onClick={(e) => handleClick(e, setCounter, interval)}> {'<-'} </div>
            {imgArr[counter]}
            <div className="forward" onClick={(e) => handleClick(e, setCounter, interval)}> {"->"} </div>
        </div>
    )

}

function createImg() {
    const path = '../src/photos/'
    const imgPathArr = [path + 'pic1.jpg', path + 'pic2.jpg', path + 'pic3.jpg', path + 'pic4.jpg'];

    const imgArr = [];
    for (let i = 0; i < imgPathArr.length; i++) {
        imgArr.push(<img src={imgPathArr[i]} alt="sample pic" />)
    }

    return imgArr
}

function handleClick(e, setCounter, interval) {
    clearInterval(interval.current)
    if (e.currentTarget.className.includes("forward")) {
        setCounter(prev => prev + 1)
    } else {
        setCounter(prev => prev - 1)
    }
    interval.current = setInterval(() => {
        setCounter(prev => prev + 1)
    }, 3000)
}