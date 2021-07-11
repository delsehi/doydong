import React, { useState } from 'react';
import NavbarHero from './NavbarHero';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const postLogin = () => {
        const credentials = JSON.stringify({
            email: email,
            password: password
        })
        
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            credentials: 'include',
            body: credentials,
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            console.log(res)
        }).catch(err => console.error(err))
    }

    return (
        <div>
            <div className="hero is-primary">
            <NavbarHero />
            </div>
            <div className="section">

            <div className="box has-background-grey-white-ter">
                <div className="title is-4 has-text-black has-text-centered">Log in</div>
                <div className="container has-text-centered">
                    <p className="title is-6 has-text-grey-darker">With Google</p>
                    <a href="http://localhost:8080/auth/google" className="button is-link is-medium">Google Sign In</a>

                    <br /><br /> <hr />
                    <p className="title is-6 has-text-grey-darker">Or</p>
                </div>
                <div className="section">
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" value={email} onChange={e => setEmail(e.target.value)}
                        type="email" placeholder="e.g. jelenadoe@tuta.io"></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" value={password} onChange={e => setPassword(e.target.value)}
                        type="password"></input>
                    </div>
                </div>

                <div className="field">
                    <button className="button" onClick={postLogin}>Log in</button>
                </div>

                </div>

            </div>
            </div>
        </div>
    )
}

export default Login;



