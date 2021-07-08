import React, { useState } from 'react';


function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const postRegister = () => {
        const credentials = JSON.stringify({
            email: email,
            name: name,
            password: password
        })
        console.log(credentials)
        
        fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            body: credentials,
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            console.log(res)
        }).catch(err => console.error(err))
    }

    return (
        <div className="container">
            <div className="box has-background-grey-white-ter">
                <div className="title is-4 has-text-black has-text-centered">Sign up</div>
                <div className="container has-text-centered">
                    <p className="title is-6 has-text-grey-darker">With Google</p>
                    <a href="http://localhost:8080/auth/google" className="button is-link is-medium">Google Sign In</a>


                    <p className="title is-6 has-text-grey-darker">Or create an account</p>
                </div>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" value={name} onChange={e => setName(e.target.value)}
                        type="text" placeholder="e.g Jelena Doe"></input>
                    </div>
                </div>

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
                    <button className="button" onClick={postRegister}>Sign up</button>
                </div>

            </div>
        </div>
    )
}

export default SignUp;



