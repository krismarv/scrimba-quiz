import React from 'react';
import '../css/main.css'
import Img from '../ouch-downloading.png'
import Triangle from '../ouch-triangle-play.png'

export default function Main (props) {

    let catSelItems = props.categories.map((cat)=> {
        return <option key={cat.id} value={cat.id}>{cat.name}</option>
    })
    
    return (
        <>
            <img src={Img} alt="" className="max-h-72"></img>
            <div className="flex flex-col">
                <h1 className="text-7xl main-heading" >Trivia Quiz</h1>
                <form onSubmit={props.play}>
                    <select value={props.category} onChange={props.changeCat} className="w-56 mt-8 h-9 p-2">
                        <option value="all">All categories</option>
                        {catSelItems}
                    </select>
                    <button type="submit" className="mt-8 bg-rose-300 p-10 w-48">
                        <img src={Triangle} alt="play" className="max-h-4 inline"></img>
                    &nbsp;Play
                        </button>
                </form>
            <div id="credits" className="text-xs mt-10">Illustration by <a href="https://icons8.com/illustrations/author/HzkZD6h9f9qm">AsIa Vitalyevna</a> from <a href="https://icons8.com/illustrations">Ouch!</a></div>
            </div>
        </>
    )
}