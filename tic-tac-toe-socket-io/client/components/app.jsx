import React, {useState} from "react";
import io from "socket.io-client";
import Board from "./board"
import Room from "./room"

export default function App () {
    const {room, setRoom} = useState(null);
    const socket = io();
    socket.on('message', console.log)
    return (
        <div className="container">
            Hello
            {
                (room && <Room/>) 
                ||
                (<Board/>)
            }
        </div>
    )
}