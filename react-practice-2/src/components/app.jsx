import React from "react";
import Board from "./board"

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="row">Tic Tac Toe</h1>
        <Board></Board>
      </div>
    )
  }
}
