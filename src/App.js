import './App.css';
import React from "react";
import Main from './components/Main';
import Quiz from './components/Quiz'


function App() {

  const [play, setPlay] = React.useState(false)

  function playNow() {
    setPlay(play=>!play)
  }

  return (
    <>
      <main id="main" className="flex flex-col bg-slate-100 max-w-xl ml-auto mr-auto">
        {!play ? 
          <Main  play={playNow}/>
          : <Quiz />
        }
      </main>      
    </>
  );
}

export default App;
