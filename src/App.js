import './App.css';
import Player from './components/player';
import { useState, useRef } from 'react';
import Gameboard from './components/Gameboard.js';
import Log from './components/Log.js';
import ps from './possibilities.js'
import Dialog from './components/Dialog.js';

function App() {

  let [playerNames, setPlayerNames] = useState(['player1', 'player2']) 
  let [log, setLog] = useState([])
  let [hasWon, setHasWon] = useState('playing')
  let dialog = useRef(null);

  function changePlayer1(player1){
    setPlayerNames((names) => {
      return [player1, names[1]]
    }
    )
  }

  function changePlayer2(player2){
    setPlayerNames((names) => {
      return [names[0], player2]
    }
    )
  }

  let activePlayer = playerNames[0];
  let currentPlayer = '';
  if(log.length !== 0){
    currentPlayer = log[0].val;
    if(currentPlayer === 'X'){
      activePlayer = playerNames[1]
      currentPlayer = playerNames[0]
    }
    else{
      activePlayer = playerNames[0]
      currentPlayer = playerNames[1]
    }

  }

  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  let hsh = {}
  log.forEach(element => {
      let {row, col, val} = element;
      if(row in hsh){
          hsh[row][col] = val;
      }
      else{
          hsh[row] = {}
          hsh[row][col] = val;
      }
  });
  for(let row = 0;row < 3;row++){
      for(let col = 0; col < 3; col++){
          if(row in hsh && col in hsh[row]){
              board[row][col] = hsh[row][col]
          }
      }
  }

  for (let i = 0; i < ps.length; i++) {
    let [[r1, c1], [r2, c2], [r3, c3]] = ps[i];
    if (board[r1][c1] !== '' && board[r1][c1] === board[r2][c2] && board[r2][c2] === board[r3][c3]) {
      if (hasWon !== 'won') {
        setHasWon('won');
        break;
      }
    }
  } 

  if(log.length === 9 && hasWon === 'playing'){
      setHasWon('Draw');
  }

  let text = 'something wrong';
  if(hasWon !== 'playing'){
    text = 'OOPS! Game is Draw!'
    if(hasWon === 'won'){
      text = `Hurray! ${currentPlayer} Won the game`
    }
  }

  if(dialog.current != null){
  if(hasWon !== 'playing'){
    dialog.current.showModal();
  }
  else{
    dialog.current.close();
  }
}

  function handledialog(){
    setHasWon('playing');
    setLog([]);
  }


  return (
    <>
    <div className='mt-5'>
      <h1 className='text-center'>Tic Taco Toe</h1>
    </div>
    < dialog ref={dialog} className='rounded-2' style={{color:'#0C2D48', height:'10rem', width:'30rem', backgroundColor: '#B1D4E0' }}>
      <Dialog text={text} handledialog={handledialog}/>
    </dialog>
    <div className='container mt-5' style={{width:'600px'}}>
      <div className='row mt-2'>
        <label className='col-3 mt-2 fw-bold'> <div className='d-inline bg-secondary rounded'> <p className='m-2 d-inline'>X</p></div> <p className='ms-4 d-inline'>Player 1</p></label>
        <div className='col-3 text-center'>
          <Player name={playerNames[0]} setplayername={changePlayer1} number={1}/>
        </div>
        <label className='col-3 mt-2 fw-bold'> <div className='d-inline bg-secondary rounded'> <p className='m-2 d-inline'>O</p></div> <p className='ms-4 d-inline'>Player 2</p></label>        
        <div className='col-3 text-center'>
        <Player name={playerNames[1]} setplayername={changePlayer2} number={2}/>
        </div>
      <div className='row text-center'>
          <p className='fw-bold'>{activePlayer} Turn</p>
      </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-6 text-center'>
        <Gameboard log={log} setlog={setLog} board={board}/>
        </div>
      </div>
      <div className='row text-center'>
        <h5 className='text-center mt-3'>Logs</h5>
        <Log className='ms-3 mt-3' log={log} player1={playerNames[0]} player2={playerNames[1]}/>
      </div>
    </div>
    </>
  );
}

export default App;
