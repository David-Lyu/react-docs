import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const languages = [
    {
        language: "Hypertext Markup Language",
        detail: "Lorem",
        id: 0
    },
    {
        language: "Cascading Style Sheets",
        detail: "Lorem",
        id: 1
    },
    {
        language: "JavaScript",
        detail: "Lorem",
        id: 2
    },
]

ReactDOM.render(
    <App languages={languages}/>,
    document.getElementById('root')
)