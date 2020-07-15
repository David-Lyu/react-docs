import React, { useState, useRef } from 'react';


export default function App(props) {
    const [languageId, setLanguageId] = useState(null)
    const prevLanguage = useRef()

    function handleClick(languageId) {
        if(languageId === prevLanguage.current) {
            prevLanguage.current = null;
            return setLanguageId(null)
        }
        prevLanguage.current = languageId
        setLanguageId(languageId)
    }

    const languges = props.languages.map(language => {
        return (
                <li key={language.id} onClick={ () => handleClick(language.id)}>
                    <h5>{language.language}</h5>
                    {
                        (
                            languageId === language.id &&
                            <p>{language.detail}</p>
                        ) ||
                        null
                    }
                </li>
        )
    })

    return (
        <ul>
            {languges}
        </ul>
    )

}