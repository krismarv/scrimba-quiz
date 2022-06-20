import React from 'react';
import '../css/main.css'
import Img from '../ouch-downloading.png'
import Triangle from '../ouch-triangle-play.png'

export default function Main (props) {
    return (
        <>
            <img src={Img} alt="" className="max-h-80"></img>
            <h1 className="handwritten text-7xl" >Trivia Quiz</h1>
            <button className="mt-8 bg-rose-300 p-10 rounded-full" onClick={props.play}>
                <img src={Triangle} alt="play" className="max-h-4 inline"></img>
                &nbsp;Play
            </button>
            <div id="credits">Illustration by <a href="https://icons8.com/illustrations/author/HzkZD6h9f9qm">AsIa Vitalyevna</a> from <a href="https://icons8.com/illustrations">Ouch!</a></div>
        </>
    )
}