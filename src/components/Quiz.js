import React, { useEffect } from "react";
import '../css/quiz.css'
import arrow from '../arrow-left.png'

export default function Quiz (props) {

    const [questions, setQuestions] = React.useState([])
    const [questionElements, setQuestionElements] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [numberOfQuestions, setNumberOfQuestions] = React.useState(10)
    const [clicked, setClicked] = React.useState(0)

    useEffect(()=>{
        fetch("https://opentdb.com/api_token.php?command=request")
            .then(res=>res.json())
            .then(data=>{
                fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${data.token}${props.category==="all" ? "" : `&category=${props.category}`}`)
                    .then(res=>res.json())
                    .then(data=>{
                        setQuestions(data.results);
                        return data.results  
                    })
                    .then(oldQuestions => {
                        let questionArray = oldQuestions.map(function(question, index) {
                            let answers = [...question.incorrect_answers]
                            answers.splice(Math.floor(Math.random()*answers.length)+1, 0, question.correct_answer);
                            return {...question, answers:answers}
                    })
                    setQuestions(questionArray)
                    return questionArray
                    })
                    .then(questionArray => {
                        let questionElArray = questionArray.map(function(question, index) {
                            return (
                                <>
                                    <div key={index} className="question" dangerouslySetInnerHTML={{__html:question.question}}></div>
                                    <div className="answers mt-6 mb-6 break-all">{question["answers"].map((answer, aIndex)=>{
                                        return <div 
                                                    key={`${index}-answer-${aIndex}`} 
                                                    className="answer inline-block whitespace-nowrap border-solid border-2 border-neutral-600 rounded-full p-3 m-2 font-semibold mt-1 mb-1 cursor-pointer hover:bg-neutral-300" 
                                                    onClick={right} 
                                                    data-question={index} 
                                                    data-value={answer}
                                                    dangerouslySetInnerHTML={{__html:answer}}
                                                ></div>
                                        })}
                                    </div>
                                </>            
                            )
                        })
                    setQuestionElements(questionElArray)
                    return questionArray
                    })
            })            
    }, [numberOfQuestions])


    

    function right(event) {
        event.preventDefault()
        setClicked(oldClicked=>{
            return oldClicked+1
        });
        setQuestions(questions => {
            let currentQ = questions[event.target.getAttribute("data-question")]
        
        if (event.target.getAttribute("data-value")===currentQ.correct_answer) {
            console.log("yes")
            event.target.classList.add("right");
            setScore(prevScore => {return prevScore+1});
        } else {
            event.target.classList.add("wrong");
        }
        let allQAnswers = document.querySelectorAll(`[data-question="${String(event.target.getAttribute("data-question"))}"]`)
        allQAnswers.forEach(a=> a.classList.add("no-click"))
        return questions
        })
        
    }

    useEffect(()=> {
        if (clicked === numberOfQuestions) {
        let scoreEl = document.querySelector("#quiz-score")
        scoreEl.textContent = `You scored ${score} out of ${numberOfQuestions} questions.`
    }}, [clicked])
    

    return (
        <>
            <div className="question-container">
                <img className="arrow" onClick={props.restart} style={{cursor:"pointer"}} src={arrow}></img>
                {questionElements}
                <div id="quiz-score"></div>
                {clicked === numberOfQuestions ? <button className="bg-amber-400 h-10 quiz" onClick={props.restart}>Restart</button> : ""}
            </div>
            
        </>
    )
}