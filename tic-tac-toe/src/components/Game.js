import React, {Component} from 'react';

import {GameBoard} from "./GameBoard";
import {GameInfo} from './GameInfo';

export class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastStep: `game start`
      }],
      xIsNext: true,
      // sort -- 历史记录逆序或顺序
      sort: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    let location = `(${Math.floor(i / 3) + 1},${i % 3 + 1})`;
    let desc = `moved to ${location}`;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState(prevState => ({
      history: history.concat({squares: squares, lastStep: desc}),
      xIsNext: !prevState.xIsNext,
    }));
  }

  jumpTo(move){
    this.setState({
      history: this.state.history.slice(0, move+1),
      xIsNext: (move%2) ? false : true    // !(move%2)
    })
  }

  toggleSort() {
    this.setState(prevState => ({
      sort: !prevState.sort
    }));
  }

  reset() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
        lastStep: `game start`
      }],
      xIsNext: true,
      sort: false
    });
  }

  render() {
    let history = this.state.history.slice();

    const current = history[history.length-1];
    const winner = calculateWinner(current.squares).winner;
    const winnerLine = calculateWinner(current.squares).line;
    let status;
    let isFinished = false;
    if (winner) {
      isFinished = true;
      status = `winner: ${winner}`;
    } else{
      status = `Next player is: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    if(this.state.history.length === 10 && !winner) {
      isFinished = true;
    }

    // 历史记录列表
    let moves = history.map((step, move) => {
      const desc = step.lastStep;
      // 最后一步为当前步， 加粗显示
      if (step === history[history.length-1]) {
        return (
          <li key={move} >
            <a href="#" onClick={() => this.jumpTo(move)}><strong>{desc}</strong></a>
          </li>
        );
      }
      return (
        <li key={move} >
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    if (this.state.sort) {
      // 历史记录逆序
      moves = moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <GameBoard squares={current.squares}
                     onClick={this.handleClick}
                     winnerLine={winnerLine}
          />
          {(isFinished || !current.squares.includes(null)) &&
          (<div>
            <h5 style={{color: 'red'}}>{status.indexOf('winner') == 0 ? status : 'no one wins!'}</h5>
            <button onClick={this.reset}>restart</button>
          </div>)}
        </div>
        <GameInfo
          isFinished={isFinished}
          status={status}
          toggleSort={this.toggleSort}
          moves={moves}
        />
      </div>
    )
  }
}

// 胜者计算方式
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], line: [a, b, c]};
    }
  }
  return {winner: null, line: []};

}
