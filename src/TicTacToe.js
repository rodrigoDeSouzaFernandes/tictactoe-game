import React, { useState, useEffect } from 'react'
import '../src/styles/tictactoe.css'
function TicTacToe() {
  const emptyBoard = Array(9).fill('');
  const [board, setBoard] = useState(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState('x')
  const [winner, setWinner] = useState(null)
  console.log(winner)

  const handleCellClick = (index) => {
    if(winner) return null;
    if(board[index] !== '') return null;

    setBoard(
      board.map((item, i) => i === index ? currentPlayer : item)
    )

    setCurrentPlayer(
      currentPlayer === 'x' ? 'o' : 'x'
    )
  }

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach((cells) => {
      if(cells.every(cell => cell === "o")) setWinner('o')
      if(cells.every(cell => cell === "x")) setWinner('x')
    });

    checkDraw();
  }

  const checkDraw = () => {
    if(board.every(item => item !== '')) {
      setWinner('E')
    }
  }

  useEffect(checkWinner, [board])

  const resetGame = () => {
    setCurrentPlayer('x');
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main >
      <h1 className="title">Jogo da velha</h1>
      <div className={`board ${winner ? 'game-over' : ''}`}>
        {board.map((item, index) => (
            <div 
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}
            >
              {item}
            </div>
          )
        )}
      </div>
      
      {winner &&
        <div className="restart-game">
          {winner === 'E' ? (
            <h2 className="winner-message">
            <span className={winner}>Deu Velha!</span>
          </h2>
          ) : (
          <h2 className="winner-message">
            <span className={winner}>{winner}</span> venceu!
          </h2>
          )}
          
          <button className="restart-btn" onClick={resetGame}>Recomeçar jogo</button>
        </div>
      }
    </main>
  );
}

export default TicTacToe;
