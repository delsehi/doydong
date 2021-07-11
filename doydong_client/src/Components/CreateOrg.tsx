import React, { useState } from 'react';
import NavbarHero from './NavbarHero';

function CreateOrg() {
    const [orgName, setOrgName] = useState('')
    const [orgDesc, setOrgDesc] = useState('')

    const postCreateOrg = () => {
        const credentials = JSON.stringify({
            org_name: orgName,
            org_description: orgDesc
        })
        
        fetch('http://localhost:8080/api/createorganization', {
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
                <div className="title is-4 has-text-black has-text-centered">Create a new organization</div>

                <div className="section">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" value={orgName} onChange={e => setOrgName(e.target.value)}
                        type="email" placeholder="e.g The Toki Pona Foundation"></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <input className="textarea" value={orgDesc} onChange={e => setOrgDesc(e.target.value)}
                        type="email" placeholder="e.g The Toki Pona Foundation"></input>
                    </div>
                </div>


                <div className="field">
                    <button className="button is-link" onClick={postCreateOrg}>Create</button>
                </div>

                </div>

            </div>
            </div>
        </div>
    )
}

export default CreateOrg;



