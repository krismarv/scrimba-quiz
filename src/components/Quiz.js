import React, { useEffect } from "react";
import '../css/quiz.css'

export default function Quiz () {

    const [questions, setQuestions] = React.useState([])
    const [questionElements, setQuestionElements] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [numberOfQuestions, setNumberOfQuestions] = React.useState(10)
    const [clicked, setClicked] = React.useState(0)

    useEffect(()=>{
        fetch("https://opentdb.com/api_token.php?command=request")
            .then(res=>res.json())
            .then(data=>{
                fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${data.token}`)
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
                                    <div className="answers mt-4 mb-4">{question["answers"].map((answer, aIndex)=>{
                                        return <span 
                                                    key={`${index}-answer-${aIndex}`} 
                                                    className="answer border-solid border-2 border-neutral-600 rounded-full p-3 m-2 font-semibold mt-11 cursor-pointer hover:bg-neutral-300" 
                                                    onClick={right} 
                                                    data-question={index} 
                                                    data-value={answer}
                                                    dangerouslySetInnerHTML={{__html:answer}}
                                                ></span>
                                        })}
                                    </div>
                                </>            
                            )
                        })
                    setQuestionElements(questionElArray)
                    })
            })            
    }, [numberOfQuestions])


    

    function right(event) {
        let currentQ = questions[event.target.getAttribute("data-question")]
        if (event.target.getAttribute("data-value")===currentQ.correct_answer) {
            event.target.classList.add("right");
            setScore(score => score+1);
            setClicked(clicked=>clicked+1)
        } else {
            event.target.classList.add("wrong");
            setClicked(clicked=>clicked+1)
        }
        let allQAnswers = document.querySelectorAll(`[data-question="${String(event.target.getAttribute("data-question"))}"]`)
        allQAnswers.forEach(a=> a.classList.add("no-click"))
        if (clicked === numberOfQuestions-1) {
            let scoreEl = document.querySelector("#quiz-score")
            scoreEl.textContent = `You scored ${score} out of ${numberOfQuestions} questions.`
        }
    }
    

    return (
        <>
            <div className="question-container">
                {questionElements}
                <div id="quiz-score"></div>
            </div>
        </>
    )
}