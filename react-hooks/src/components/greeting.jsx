import React, { useState, useContext, useEffect } from 'react';
//time stamp: 
//  useState 18:54
//  context 28:30
// life cycle methods 34:04
// subscription: 38:48

export default function Greeting(props) {
    // const [name, setName] = useState("Mary"); //use the useFormInput
    // const [surname, setSurname] = useState("Poppins");
    const name = useFormInput('Mary')
    const surname = useFormInput('Poppins')
    const width = useWindowWidth();
    useDocumentTitle(name + ' ' + surname)

    // useEffect(() => { //no longer needed from useDocumentTitle
    //     document.title = `${name} ${surname}`
    // })

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleSurnameChange(e) {
        setSurname(e.target.value)
    }
    
    return (
        <section>
            <div label="Name">
            <div>Name:</div>
                <input 
                {...name}
                // onChange={handleNameChange}
                />
            </div>

            <div label="Surname">
            <div>Surname:</div>
                <input 
                {...surname}
                // onChange={handleSurnameChange}
                />
            </div>

            <div label="Width">
            <div>Width</div>
                {width}
            </div>
        </section>
    )
}

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue)

    function handleChange(e) {
        setValue(e.target.value)
    }

    return {
        value,
        onChange: handleChange
    }
}


function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title
    })
}
function useWindowWidth() { //custom hook -> by converntion custom hooks have use in the first part of the name
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })
    return width;
}