import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <Header>
        <p>Feito por Geovanna Otoni</p>
        <p>Minhas redes sociais:
          <a href="https://github.com/geovannaotoni" class="fab fa-github" />
          <a href="https://www.linkedin.com/in/geovanna-otoni/" class="fab fa-linkedin" />
        </p>
      </Header>
    )
  }
}

export default Header;
