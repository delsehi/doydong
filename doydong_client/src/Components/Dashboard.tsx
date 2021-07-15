import React from 'react'
import { useContext } from 'react'
import { userContext } from '../Context/Context'
import NavbarHero from './NavbarHero'

function Dashboard() {
    const user: any = useContext( userContext )

    return (
        <div>
            <NavbarHero />

                    {
                        user ? (
                            <div className="section">
                                <p className="title is-2">{user.name}</p>
                            </div>
                        ) : (
                            <div className="section">
                                <p className="title">You are not logged in.</p>
                            </div>
                        )
                    }

      

        </div>
    )
}



export default Dashboard