import React from 'react';

// 游戏信息展示
export function GameInfo( {isFinished, status, toggleSort, moves} ) {
  return (
    <div className="game-info">
      { !isFinished && <div className="status">{status}</div> }
      <ul>{moves}</ul>
      <button className="reset" onClick={toggleSort} >sort</button>
    </div>)
}