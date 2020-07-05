import React, { useState, useEffect } from 'react';
//time stamp
    //1:03:30
export default function Media() {
    const small = useMedia("(max-width: 400px");
    const large = useMedia("(min-width: 800px");
    const width = useWidth()

    return (
        <div>
            <h1>Media</h1>
            <div>
                Width: {width}
            </div>
            <p>
                Small? { small ? "Yep" : "Nope" }
            </p>
            <p>
                Large? { large ? "Yep" : "Nope" }
            </p>
        </div>
    )

}

function useMedia(query) {
    let [matches, setMatches] = useState(
        window.matchMedia(query).matches
    )

    useEffect(() => {
        let media = window.matchMedia(query);
        if(media.matches !== matches) {
            setMatches( media.matches)
        }

        let listener = () => setMatches(media.matches);
        media.addListener(listener);
        return () => {
            media.removeListener(listener)
        }
    }, [query])// the second arg is componentDidUpdate

    return matches
}

function useWidth() {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return (
            window.removeEventListener('resize', handleResize)
        )
    })
    return width;
}