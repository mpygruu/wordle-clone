import { useEffect, useState } from "react";

function App() {
  const [word, setWord] = useState(null);
  
  //useEffect performs after render.
  useEffect(() => {
    fetch('http://localhost:3000/wordsList')
    .then(response => response.json())
    .then(json => {
      const randomWord = json[Math.floor(Math.random()*json.length)];
      setWord(randomWord);
    })
  }, [setWord])

  return (
    <div className="App">
      <h1>Wordle Clone</h1>
    </div>
  );
}

export default App;