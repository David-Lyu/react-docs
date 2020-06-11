import React from "react"
import Square from "./square"

export default class Board extends React.Component {

  getSquares() {
    this.squares = [];
  }

  renderSquare(i) {
    return <Square value={i}/>
  }

  render() {

    return (
      <div className="board">
        {this.renderSquare(9)}
      </div>
    )
  }
}
