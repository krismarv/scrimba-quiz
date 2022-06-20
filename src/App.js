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
      <main id="main" className="flex xs:flex-col md:flex-row bg-slate-100 max-w-xl ml-auto mr-auto">
        <div className="circle z-0" id="circle-1" ></div>
        <div className="circle z-0" id="circle-2"></div>
        {!play ? 
          <Main  className="z-50" play={playNow}/>
          : <Quiz className="z-50" />
        }
        
      </main>      
    </>
  );
}

export default App;
