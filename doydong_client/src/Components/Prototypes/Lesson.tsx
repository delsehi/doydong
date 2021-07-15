import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import { useEffect } from 'react'
import NavbarHero from '../NavbarHero'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'

function Lesson() {
//    const choices: any[] = [{ ch_id: 4, ch: "15" }, { ch_id: 6, ch: "20" }, { ch_id: 14, ch: "60" }]
    const choices: any[] = ["no", "yes"]
    const lessonID = new URLSearchParams(useLocation().search).get('id')
    const [lesson, setLesson] = useState<any>()
    console.log(lessonID)

    useEffect(() => {
        fetch(`http://localhost:8080/api/lesson/${lessonID}`, {
            method: 'GET', credentials: 'include'
        }).then((res: any) => {
            //  console.log("Fetch response: ", res);
            res.json().then((parsed: any) => {
                if (parsed) {
                    //      console.log(parsed)
                    setLesson(parsed)
                }
            })
        })
    }, [lessonID])

    if (!lesson) return (<progress className="progress is-large is-info" max="100"></progress>)

    return (
        <div>
            <NavbarHero />
            <div className="section has-text-centered">
                <div className="container">
                    <h1 className="title is-2">{lesson.title}</h1>
                    <div className="container">{lesson.content}</div>
                </div>
                <div className="section">
                    <div className="title is-4">Now test your knowledge</div>
                    {lesson.questions.map((q: any) => {
                        const incorrect = JSON.parse(q.choices.incorrect)
                        const correct = JSON.parse(q.choices.correct)
                        return <MultipleChoiceQuestion question={q.question} correct={correct} incorrect={incorrect} />
                    })}

                </div>
            </div>
        </div>
    )
}



export default Lesson