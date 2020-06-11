import React from "react"
import Square from "./square"

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares = 9
    }
  }

  render() {
    const boardArea = []
    for(i = 0; i < this.state.squares; i++) {
      boardArea.push(<Square id={i} value={i}/>)
    }

    return (
      <div className="board">
        {boardArea}
      </div>
    )
  }
}
