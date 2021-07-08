import React from 'react'
import { useState } from 'react'

function SetupOrganization() {
    const searchField = document.getElementById('searchOrg')
    const searchBtn = document.getElementById('searchBtn')
    const [query, setQuery] = useState('')
    const [searchResult, setSearchResult] = useState<any>([]);

    const searchOrg = async (e: any) => {
        fetch(`http://localhost:8080/api/org/${query}`).then(res => res.json().then(data => {
            setSearchResult(data)
        }))
        
    }

    return (
        <div>
            <div className="hero is-primary is-small">
                <div className="hero-body">
                    <div className="title">Doydong</div>
                </div>
            </div>
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
                            searchResult.map( (el:any) => {
                                return (<li>{el.org_name}</li>)
                            })
                            }
                        </ul>

                        <div className="section">
                            <h2 className="title is-4">Or create a new one</h2>
                            <a href="/createOrg" className="button is-link">Create organization</a>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}



export default SetupOrganization