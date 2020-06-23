import React from "react"
import Square from "./square"

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.checkWinner = this.checkWinner.bind(this)
    this.changePlayer = this.changePlayer.bind(this)
    this.reset = this.reset.bind(this)
    this.state = {
      squares: 9,
      player: 1,
      reset: false,
      win: false
    }
  }

  changePlayer(e) {
    const value = this.state.player === 1? 'X' : 'O'
    this.state.player === 1? this.setState({player: 2}): this.setState({player: 1})
  }

  checkWinner(index) {
    const player = this.state.player === 1 ? "O" : "X"
    // index = parseInt(index)
    const square = document.querySelectorAll(".square")

    if(index <= 2) {
      //check horizontal
      for(let i = 0; i < 3; i++) {
        if(square[i].value === player) {
          if(i === 2){
            return this.setState({ win: true })
          }
          continue
        } else {
          break;
        }
      }
      //check verticle
      if(square[index + 3].value === player) {
        if(square[index + 6].value === player) {
          return this.setState({ win: true })
        }
      }
      //check diagonal
      if(index === 0) {
        if(square[4].value === player) {
          if(square[8].value === player) {
            return this.setState({ win: true })
          }
        }
      }
      if(index === 2) {
        if(square[4].value === player) {
          if(square[6].value === player) {
            return this.setState({ win: true })
          }
        }
      }
    }

    if(index > 2 && index < 6) {
    //check horizontal
    for(let i = 3; i < 6; i++) {
      if(square[i].value === player) {
        if(i === 5) {
          return this.setState({ win: true })
        }
          continue;
        } else {
          break;
        }
      }
      //check verticle
      if(square[index + 3].value === player) {
        if(square[index - 3].value === player) {
          this.setState({ win: true })
        }
      }
      //check diagonal
      if(index === 4) {
      if(square[0].value === player) {
        if(square[8].value === player) {
          return this.setState({ win: true })
        }
      }
      if(square[2].value === player) {
        if(square[6].value === player) {
          return this.setState({ win: true })
        }
      }
      }
    }

    if(index > 5 && index < 9) {
      //check horizontal
      for(let i = 6; i < 9; i++) {
        if(square[i].value === player) {
          if(i === 8) {
            return this.setState({ win: true })
          }
        } else {
          break;
        }
      }
      //check verticle
      if(square[index - 3].value === player) {
        if(square[index - 6].value === player) {
          this.setState({ win: true })
        }
      }
      //check diagonal
      if(index === 6) {
        if(square[4].value === player) {
          if(square[2].value === player) {
            return this.setState({ win: true })
          }
        }
      }
      if(index === 8) {
        if(square[4].value === player) {
          if(square[0].value === player) {
            return this.setState({ win: true })
          }
        }
      }
    }
  }

  reset() {
    const reset = this.state.reset
    this.setState({
      player: 1,
      reset: !reset,
      win: false
    })
  }

  render() {
    let winningPlayer = '';
    if(this.state.win && this.state.player === 1) {
      winningPlayer = '2'
    }
    if(this.state.win && this.state.player === 2) {
      winningPlayer = '1'
    }
    const boardArea = []
    for(let i = 1; i <= this.state.squares; i++) {
      boardArea.push(
        <Square 
          key={i}
          id={i - 1}
          changePlayer={this.changePlayer} 
          player={this.state.player}
          reset={this.state.reset}
          checkWinner={this.checkWinner}
          win={this.state.win}
        />
      )
    }

    return (
      <>
        <div className="row">
          {
            (this.state.win && 
            <h3>{`Winner: Player ${winningPlayer}`}</h3>) ||
            <h3>{`Turn: Player ${this.state.player}`}</h3>
          }
          <button onClick={this.reset}>Reset</button>
        </div>
        <div className="board row">
          {boardArea}
        </div>
      </>
    )
  }
}
