import React from 'react'

export default function Line({ guess, currentGuess }) {

  if(guess) {
    return (
      <div className='Line'>
        {guess.map((letter, index) => {
          
          return <div key={index} className={letter.color}>{letter.key}</div>
        })}
      </div>
    )
  }

  //returned if is the guessing line
  if(currentGuess) {
    let letters = currentGuess.split('');

    return (
      <div className='Line'>
        {letters.map((letter, index) => {
          return <div key={index}>{letter}</div>
        })}
        {[...Array(5-letters.length)].map((l, index) => {
          return <div key={index}></div>
        })}
      </div>
    )
  }

  //returned if guess has no value (undefined)
  return (
    <div className='Line'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
