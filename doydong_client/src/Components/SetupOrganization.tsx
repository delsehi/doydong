import React, { useState } from 'react'
import NavbarHero from './NavbarHero';

function SetupOrganization() {
    const [query, setQuery] = useState('')
    const [searchResult, setSearchResult] = useState<any>([]);

    const searchOrg = async (e: any) => {
        fetch(`http://localhost:8080/api/org/${query}`).then(res => res.json().then(data => {
            setSearchResult(data)
        }))
    }

    return (
        <div>
            <NavbarHero />
            <div className="container has-text-centered">
                <div className="section">
                    <div className="box">
                        <h1 className="title is-3">Where do you belong?</h1>

                        <h2 className="title is-4">Find your organization</h2>

                        <div className="field has-addons is-centered is-flex is-justify-content-center">
                            <div className="control">
                                <input type="text" id="searchOrg" value={query} onChange={e => setQuery(e.target.value)}
                                className="input" placeholder="The Example Association" />
                            </div>
                            <div className="control">
                                <button id="searchBtn" onClick={searchOrg} className="button is-link">Search</button>
                            </div>
                        </div>
                        <ul>
                            {
                            searchResult.map( (org: any) => {
                                return (<li className="tag is-large is-primary">
                                    <a href={`/join/${org.org_id}`} >{org.org_name}</a></li>)
                            })
                            }
                        </ul>

                        <div className="section">
                            <h2 className="title is-4">Or create a new one</h2>
                            <a href="/createorganization" className="button is-link">Create organization</a>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}



export default SetupOrganization