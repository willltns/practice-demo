import React, {Component} from "react";

// 抽取游戏面板每一个小格
function Square({highlight, onClick, value} ) {
  if (highlight) {
    return <button className="square" onClick={onClick} style={{color: 'red'}}>{value}</button>;
  }
  return <button className="square" onClick={onClick}>{value}</button>;
}

// 抽取游戏界面中游戏面板
export class GameBoard extends Component {

  renderSquare(i) {
    return <Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      highlight={this.props.winnerLine.includes(i)}
    />;
  }

  render() {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 3*i; j < 3*i+3; j++) {
        row.push(this.renderSquare(j));
      }
      rows.push(<div className="board-row" key={i}>{row}</div>);
    }
    return(
      <div>
        {rows}
      </div>
    );
  }
}