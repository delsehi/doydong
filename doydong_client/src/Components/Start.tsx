import React from 'react'
import SignUp from './SignUp'

function Start() {
    return (
        <div>
            <div className="hero is-primary">
                <div className="hero-body is-flex is-flex-wrap is-align-content-space-around">
                    <div className="container">
                        <h1 className="title is-1">Doydong</h1>
                        <p className="subtitle is-3">Create courses for your organization.</p>
                    </div>
                    <SignUp />
                </div>
            </div>


            <div className="container">
                <div className="section has-text-centered">
                    <h2 className="title is2">Introduction</h2>
                    <p>Doydong is an e-learning platform where you can easily create courses for your organization.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ipsa sint quaerat, vitae atque
                        adipisci labore illum pariatur nisi esse quas rerum, cupiditate suscipit maxime dolorem doloribus, in numquam vel.</p>
                </div>
            </div>


        </div>
    )
}



export default Start