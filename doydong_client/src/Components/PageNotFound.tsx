import React from 'react';
import NavbarHero from './NavbarHero';


function PageNotFound() {


  return (
    <div>
      <div className="hero is-primary">
        <NavbarHero />
      </div>
      <div className="section">


          <div className="message is-danger">
            <div className="message-body has-text-centered">
              Something went wrong. Sorry!
            </div>
          </div>
      </div>

    </div>
  )
}

export default PageNotFound;



