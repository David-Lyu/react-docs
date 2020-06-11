import React from "react";
import Board from "./board"

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <Board></Board>
      </div>
    )
  }
}
