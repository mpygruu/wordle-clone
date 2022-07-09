import React from 'react';
import ReactDom from 'react-dom';

export default function GameFinished({ word, isCorrect, endGame, playAgain }) {

  if(endGame && isCorrect) {
    return ReactDom.createPortal(
      <>
      <div className='portal-theme'></div>
        <div className='GameFinished'>
          <p className='correct'>Correct!</p>
          <p>The word was:</p>
          <p className='word'>{word}</p>
          <input type='button' value='Play again' onClick={playAgain}></input>
        </div>
      </>,
      document.getElementById('portal')
    )
  }

  else if(endGame) {
    return ReactDom.createPortal(
      <>
      <div className='portal-theme'></div>
        <div className='GameFinished'>
          <p>You were close!</p>
          <p>The word was:</p>
          <p className='word'>{word}</p>
          <input type='button' value='Play again' onClick={playAgain}></input>
        </div>
      </>,
      document.getElementById('portal')
    )
  }
  
}
