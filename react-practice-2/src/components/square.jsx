import React from "react"
// import Game from "./game"
export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      squareVal: null
    }
  }

  handleClick(e) {
    const index = parseInt(e.currentTarget.id)
    if(this.state.squareVal) {
      alert("please choose an empty box")
    } else {
      this.props.changePlayer(e)
      this.props.player === 1 ? 
        this.setState({squareVal: 'X'},()=>this.props.checkWinner(index)) : 
        this.setState({squareVal: 'O'}, ()=> this.props.checkWinner(index))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.reset !== this.props.reset) {
      this.setState({squareVal: null})
    }  
  }

  render() {
    return (
      <button id={this.props.id} onClick={this.handleClick} className="square" value={this.state.squareVal} disabled={this.props.win}>
        <div className="inner-text">
        {this.state.squareVal}
        </div>
      </button>
    )
  }
}
