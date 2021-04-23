import React, { useState, useEffect } from 'react'
import '../src/styles/tictactoe.css'
function TicTacToe() {
  const emptyBoard = Array(9).fill('');
  const initialScore = {
    x: 0,
    o: 0,
  }

  const [board, setBoard] = useState(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState('x')
  const [winner, setWinner] = useState(null)
  const [score, setScore] = useState(initialScore)

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

    const checkDraw = () => {
    if(board.every(item => item !== '')) {
      setWinner('E')
    }
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
      if(cells.every(cell => cell === "o")) setWinner('o');
      else if(cells.every(cell => cell === "x")) setWinner('x');
    });

    checkDraw();
  }

  const addScore = () => {
      setScore({
        ...score,
        [winner]: score[winner] += 1,
      })
  }

  useEffect(checkWinner, [board]);
  useEffect(addScore, [winner])

  const resetGame = () => {
    setCurrentPlayer('x');
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <>
    <header>
      <h1 className="title">Jogo da velha#</h1>
    </header>
    <main >
      <div className='responsive-score'>
        <div className="current-player">
          <h2>Jogador:</h2>
          <span className={currentPlayer}>{currentPlayer}</span>
        </div>
        <div className="placar">
          <h2>PLACAR</h2>
          <span className='x'>X <span>{score.x}</span></span>
          vs
          <span className='o'><span>{score.o}</span> O</span>
        </div>
        <div className="current-player res-title">
          <h2>Jogo da velha#</h2>
        </div>
      </div>
      
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
      <div className="current-player mobile">
          <h2>Jogador:</h2>
          <span className={currentPlayer}>{currentPlayer}</span>
        </div>
    </main>
    </>
  );
}

export default TicTacToe;
