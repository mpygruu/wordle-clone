import React from 'react'
import ReactDom from 'react-dom'

export default function WordNotFound({ wrongWord }) {
  if(wrongWord) {       
    return ReactDom.createPortal(
      <>
        <div className='WordNotFound'>
            <p>Word not found!</p>
        </div>
      </>,
      document.getElementById('portal')
    )
  }
}
