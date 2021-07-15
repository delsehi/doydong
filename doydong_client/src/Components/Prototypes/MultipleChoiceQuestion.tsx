import React, { useState } from 'react'

function MultipleChoiceQuestion(props: any) {
    const [selected, setSelected] = useState('')

    const handleChange = (e: any) => {
        console.log(e.target.value)
        setSelected(e.target.value)
    }

    const returnScore = (callback: any) => {
        return selected === props.correct
    }

    return (
        <form id="question" className="card">
            <div className="card-content">
            <h2 className="title is-6">{props.question}</h2>
            <div className="control is-flex is-flex-direction-column">
                <div className="columns">
                {props.correct.map((choice: any) => {
                    return <AnswerBox key={choice} choice={choice} selected={selected} changeCallback={handleChange} />
                })}
                {props.incorrect.map((choice: any) => {
                    return <AnswerBox key={choice} choice={choice} selected={selected} changeCallback={handleChange} />
                })}

                </div>
               <p>selected answer: {selected}</p>
            </div>

            </div>
        </form>
    )
}


const AnswerBox = (prop: any) => {
    return (
        <label htmlFor="question" className="column radio" >
            <input 
            id={prop.choice} 
            type="radio" 
            value={prop.choice} 
            checked={prop.selected === prop.choice}
            onChange={prop.changeCallback} 
            name="choice" />
            {prop.choice}
        </label>
    )
}



export default MultipleChoiceQuestion