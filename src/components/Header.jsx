import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

class Header extends Component {
  render() {
    return (
      <header>
        <p>Made by Geovanna Otoni</p>
        <p>Social Media:
          <a href="https://github.com/geovannaotoni"><FontAwesomeIcon icon={faGithub} /></a>
          <a href="https://www.linkedin.com/in/geovanna-otoni/"><FontAwesomeIcon icon={faLinkedin} /></a>
        </p>
      </header>
    )
  }
}

export default Header;
