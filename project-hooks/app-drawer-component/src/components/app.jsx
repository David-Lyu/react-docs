import React, {useState} from 'react';

export default function App() {
    const [isOpen, setIsOpen] = useState(false)
    
    function openDrawer() {
        setIsOpen(prev => !prev)
    }
    return (
        (
            !isOpen &&
            <div className="container" onClick={openDrawer}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        ) ||
        <div className="menu" onClick={openDrawer}>
            <aside onClick={(e) => e.stopPropagation()}>
                <h5>Menu</h5>
                <a href="">About</a>
                <a href="">Getting Started</a>
                <a href="">Sign In</a>
            </aside>
        </div>
    )
}
