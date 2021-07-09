import React from 'react'

function NavBarHero() {
    return (
        <div className="hero-head">
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <a href="/" className="navbar-item">
                            <img className="image" src="/frog.png" alt="logo" />
                            <p className="title">Doydong</p>
                        </a>

                        <span className="navbar-burger" data-target="navbarMenuHeroC">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        </div>

                        <div id="navbarMenuHeroC" className="navbar-menu">
                            <div className="navbar-end">
                                <a className="navbar-item is-active">
                                    Home
                                </a>
                                <a className="navbar-item">
                                    Examples
                                </a>
                                <a className="navbar-item">
                                    Documentation
                                </a>
                                <span className="navbar-item">
                                    <a className="button is-link">
                                        <span>Sign in</span>
                                    </a>
                                </span>
                            </div>

                        </div>


                </div>
            </nav>
        </div>
    )
}

export default NavBarHero