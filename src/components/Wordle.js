import { useEffect } from 'react';
import useWordle from '../hooks/useWordle';
import Board from './Board';

export default function Wordle({ word }) {
  const { currentGuess, guessedWords, whichLine, handleInput } = useWordle(word);

  useEffect(() => {
    window.addEventListener('keyup', handleInput);

    //provided to avoid multiple keyup events at once after refreshing
    //runs when dismounted
    return () => window.removeEventListener('keyup', handleInput);
  }, [handleInput]);

  return (
    <div>     
      <Board guessedWords={guessedWords} currentGuess={currentGuess} whichLine={whichLine} />
    </div>
  )
}
