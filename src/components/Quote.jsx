import React, { Component } from 'react';
import Swal from "sweetalert2";

class Quote extends Component {
  componentWillUnmount() {
    Swal.fire('Quote removed!')
  }

  render() {
    const { content, isFavorite, handleFavorite } = this.props;
    const { quote, author } = content;
    return (
      <div>
        <p>{ quote }</p>
        <p>{ author }</p>
        <button
          onClick={() => handleFavorite(content)}
        >{ isFavorite ? 'Delete' : 'Favorite' }</button>
      </div>
    )
  }
}

export default Quote;
