import React from 'react'
import Line from './Line'

export default function Board({ guessedWords, whichLine }) { 
  return (
    <div>
      {guessedWords.map((word, index) => {
        return <Line key={index} guess={word} />
      })}
    </div>
  )
}
