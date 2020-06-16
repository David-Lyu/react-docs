import React from "react"
import Square from "./square"

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: 9
    }
  }

  render() {
    const boardArea = []
    for(let i = 1; i <= this.state.squares; i++) {
      boardArea.push(<Square key={i} value={"0"}/>)
    }
    console.log(boardArea)

    return (
      <div className="board row">
        {boardArea}
      </div>
    )
  }
}
