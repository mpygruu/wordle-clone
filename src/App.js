import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
  const [word, setWord] = useState();
  
  //useEffect performs after render.
  useEffect(() => {
    //get words array from json
    fetch('http://localhost:3001/wordsList')
    //retrieve data from json into array
    .then(response => response.json())
    //select random word and update word variable
    .then(json => {
      const randomWord = json[Math.floor(Math.random()*json.length)];
      setWord(randomWord);    
    })
  }, [setWord])

  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      <Wordle word={word}></Wordle>
    </div>
  );
}

export default App;