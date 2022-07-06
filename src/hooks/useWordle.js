import { useState } from 'react';

//using a hook to separate logic for Wordle from its UI
const useWordle = (word, chooseRandomWord) => {
    const [whichLine, setWhichLine] = useState(0); //lines count from 0
    const [currentGuess, setCurrentGuess] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [guessedWords, setGuessedWords] = useState([...Array(6)]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [endGame, setEndGame] = useState(false);

    //parse submitted string into an array of letters and its colors
    const formatGuessedWord = () => {
        //this line does the same thing as 3 commented lines below
        let wordLetters = [...word];
        
        //for(let i=0; i<currentGuess.length; i++) {
        //    letters.append(currentGuess.at(i));
        //}

        ///array of objects
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color: 'grey'};
        });

        //assign color to letters
        formattedGuess.forEach((guess, index) => {
            if(wordLetters.includes(guess.key)) {
                if(wordLetters[index] === guess.key) {
                    guess.color = 'green';
                }
                else {
                    guess.color = 'yellow';
                }
            }
        })
        
        return formattedGuess;
    }

    const addNewGuess = () => {
        const formattedGuess = formatGuessedWord();
        setGuessedWords((previous) => {
            let present = previous;
            //present.push(currentGuess);
            present[whichLine] = formattedGuess;
            return present;
            
        });
        setGuessedLetters((previous) => {
            let present = previous;
            for(let i=0; i<previous.length; i++) {
                present.push(currentGuess[i]);
            }
            return present;
        });
        if(currentGuess.guess === word) {
            setIsCorrect(true);
        }
        setCurrentGuess('');
        setWhichLine((previous) => previous+1);
    }

    //handle keyboard input
    const handleInput = ({ key }) => {
        if(whichLine <= 5) {
            //checking for enter to submit guess
            if(key === 'Enter' && currentGuess.length === 5) {
                addNewGuess();
                if(currentGuess === word) {
                    setIsCorrect(true);
                    setEndGame(true);
                }

                //ending the game after submitting last word
                if(whichLine === 5) {
                    setEndGame(true);
                }

            }

            //adding letter to actual guess
            if(/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
                setCurrentGuess((previous) => {
                    return previous + key.toUpperCase();
                });          
            }    
            //removing last letter with backspace
            else if(key === 'Backspace' && currentGuess.length > 0) {
                setCurrentGuess((previous) => {
                    return previous.slice(0, -1);
                }) 
            }
        }      
    }

    const playAgain = () => {
        setWhichLine(0);
        setCurrentGuess('');
        setGuessedLetters([]);
        setGuessedWords([...Array(6)]);
        setIsCorrect(false);
        setEndGame(false);
        chooseRandomWord();
    }

    return {whichLine, currentGuess, guessedLetters, guessedWords, isCorrect, endGame, handleInput, playAgain};
}

export default useWordle;