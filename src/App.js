import './App.css';
import React, { useEffect } from "react";
import Main from './components/Main';
import Quiz from './components/Quiz'


function App() {

  const [play, setPlay] = React.useState(false);
  const [categories, setCategories] = React.useState([])
  const [category, setCategory] = React.useState("all")

  const getCategory = () => {
      fetch("https://opentdb.com/api_category.php")
        .then(res=>res.json())
        .then(data=>setCategories(data.trivia_categories))
  }

  useEffect(()=>{
    getCategory()
  },[])

  function playNow(event) {
    event.preventDefault()
    setPlay(play=>!play)
  }

  function changeCat(event) {
    setCategory(event.target.value)
  }

  return (
    <>
      <main id="main" className="flex xs:flex-col md:flex-row bg-slate-100 max-w-xl ml-auto mr-auto">
        <div className="circle z-0" id="circle-1" ></div>
        <div className="circle z-0" id="circle-2"></div>
        {!play ? 
          <Main  className="z-50"
            play={playNow}
            categories={categories}
            category={category}
            changeCat={changeCat}
          />
          : <Quiz className="z-50" category={category} restart={playNow} />
        }
        
      </main>      
    </>
  );
}

export default App;
