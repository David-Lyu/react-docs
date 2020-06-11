import React from "react"

export default class Board extends React.Component {
  render() {
    return (
      <button className="square" value={this.props.value}>
        {this.props.value}
      </button>
    )
  }
}
