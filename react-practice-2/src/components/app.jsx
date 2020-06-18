import React from "react";
import Board from "./board"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reset: false
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="row">Tic Tac Toe</h1>
        <Board reset={this.state.reset}/>
      </div>
    )
  }
}
