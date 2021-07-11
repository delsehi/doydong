import React from 'react'
import { useContext } from 'react'
import { userContext } from '../Context/Context'
import NavbarHero from './NavbarHero'

function Dashboard() {
    const user: any = useContext( userContext )

    return (
        <div>
            <div className="hero is-primary">
            <NavbarHero />
            </div>
                <p>Logged in user: </p>
                    {
                        user ? (
                            <p>{user.name}</p>
                        ) : (
                            null
                        )
                    }

      

        </div>
    )
}



export default Dashboard