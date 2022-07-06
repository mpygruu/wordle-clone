import { useEffect } from 'react';
import useWordle from '../hooks/useWordle';
import Board from './Board';
import GameFinished from './GameFinished';

export default function Wordle({ word }) {
  const { currentGuess, guessedWords, whichLine, isCorrect, endGame, handleInput, playAgain } = useWordle(word);

  useEffect(() => {
    if(!endGame) {
      window.addEventListener('keyup', handleInput);
    }
    

    //provided to avoid multiple keyup events at once after refreshing
    //runs when dismounted
    return () => window.removeEventListener('keyup', handleInput);
  }, [isCorrect, handleInput]);

  return (
    <div>     
      <Board guessedWords={guessedWords} currentGuess={currentGuess} whichLine={whichLine} />
      <GameFinished word={word} endGame={endGame} isCorrect={isCorrect} playAgain={playAgain}></GameFinished>
    </div>
  )
}
