import React from 'react'

export default function Line({ guess }) {

  if(guess) {
    return (
      <div className='Line'>
        {guess.map((letter, index) => {
          
          return <div key={index} className={letter.color}>{letter.key}</div>
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
