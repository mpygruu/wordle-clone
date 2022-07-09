import { useState } from 'react';

//using a hook to separate logic for Wordle from its UI
const useWordle = (word, chooseRandomWord) => {
    const [whichLine, setWhichLine] = useState(0); //lines count from 0
    const [currentGuess, setCurrentGuess] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [guessedWords, setGuessedWords] = useState([...Array(6)]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [endGame, setEndGame] = useState(false);
    const [wrongWord, setWrongWord] = useState(false);

    const checkWord = async () => {
        //get words array from json
        const response = await fetch('http://localhost:3001/wordsList');
        //retrieve data from json into array
        const json = await response.json();

        return binarySearch(json);  
    }

    const binarySearch = (words) => {
        let left = 0;
        let right = words.length-1;
        
        while(left < right) {
            let middle = Math.floor((left+right)/2);
            let result = currentGuess.localeCompare(words[middle])
            console.log(result + " " + left + " " + right + " " + words[middle])
            if(result === 0) {
                return true;
            }
            else if(result === 1) {
                left = middle+1;
            }
            else if(result === -1) {
                right = middle;
            }
        }
        return false;
    }

    //return an array where every letter has its number of occurences
    //helps determine color of checked letter
    const wordLettersOccurences = () => {

        let letters = []
        
        //assign a number (0) for every element
        for(let i=0; i<word.length; i++) {
            letters[word[i]] = 0;
        }

        for(let i=0; i<word.length; i++) {
            letters[word[i]]++;
        }

        return letters;
    }

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

        let letters = wordLettersOccurences();

        let lettersLeft = [Array(6)];
        //assign a number (0) for every element
        for(let i=0; i<currentGuess.length; i++) {
            lettersLeft[currentGuess[i]] = 0;
        }
        
        //assign green color to letters
        formattedGuess.forEach((guess, index) => {
            if(wordLetters.includes(guess.key)) {
                if(wordLetters[index] === guess.key) {
                    guess.color = 'green';
                    lettersLeft[guess.key]++;
                }               
                
            }
        })
        
        //assign yellow color to letters
        formattedGuess.forEach((guess) => {
            if(wordLetters.includes(guess.key)) {
                if(lettersLeft[guess.key] < letters[guess.key] && guess.color !== 'green') {
                    guess.color = 'yellow';
                    lettersLeft[guess.key]++;
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
                checkWord().then((wordExists)  => {
                    if(wordExists) {
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
                    else {
                        //show that the provided word is wrong for a period of time
                        setWrongWord(true);
                        setTimeout(() => {
                            setWrongWord(false);
                        }, 1000);
                    } 
                })                   
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

    return {whichLine, currentGuess, guessedLetters, guessedWords, isCorrect, endGame, handleInput, playAgain, wrongWord};
}

export default useWordle;