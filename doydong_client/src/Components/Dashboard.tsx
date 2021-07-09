import React from 'react'
import { useContext } from 'react'
import { userContext } from '../Context/Context'

function Dashboard() {
    const user: any = useContext( userContext )

    return (
        <div>
            <div className="hero is-primary is-small">
                <div className="hero-body">
                    <div className="title">Doydong</div>
                    {
                        user ? (
                            <p>{user.name}</p>
                        ) : (
                            null
                        )
                    }
                </div>
            </div>

        </div>
    )
}



export default Dashboard