import React from 'react'
import Line from './Line'

export default function Board({ currentGuess, guessedWords, whichLine }) { 
  return (
    <div>
      {guessedWords.map((word, index) => {
        if(whichLine === index) {
          return <Line key={index} currentGuess={currentGuess} />
        }
        return <Line key={index} guess={word} />
      })}
    </div>
  )
}
