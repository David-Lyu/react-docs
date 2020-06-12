import React from "react"
// import Game from "./game"
export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    console.log(e.currentTarget)
  }

  render() {
    return (
      <button onClick={this.handleClick} className="square" value={this.props.value}>
        <p className="inner-text">
        {this.props.value}
        </p>
      </button>
    )
  }
}
