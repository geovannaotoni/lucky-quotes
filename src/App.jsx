import React from 'react';
import './App.css';
import Quote from './components/Quote';
import ClipLoader from "react-spinners/ClipLoader";
import Header from './components/Header';

class App extends React.Component {
  state = {
    quote: '',
    author: '',
    isLoading: true,
    favoriteQuotes: [],
    newFavorite: false,
  }

  // função para fazer a requisição para API e setar as informações no state
  fetchQuote = async () => {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    this.setState({
      quote: data.content,
      author: data.author,
      isLoading: false,
    })
  }

  // faz o fetch após o componente ser renderizado
  componentDidMount() {
    // adicionei a recuperação do localStorage caso existam frases já favoritadas anteriormente
    const favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes'));
    if (favoriteQuotes) {
      this.setState({
        // isLoading: false,
        favoriteQuotes: favoriteQuotes,
      })
    }
    this.fetchQuote();
  }

  // coloca a nova frase no state e seta o status true para o newFavorite
  handleFavorite = (content) => {
    const { favoriteQuotes } = this.state;

    if(favoriteQuotes.some(({quote}) => quote === content.quote)) {
      this.setState({
        favoriteQuotes: favoriteQuotes.filter(({quote}) => quote !== content.quote), // retira a frase se ela já estiver no array de favoritados
        newFavorite: true,
      });
      return;
    }

    this.setState({
      favoriteQuotes: [...favoriteQuotes, content],
      newFavorite: true,
    })
  }

  // Após o componente ser atualizado, se newFavorite for true (ou seja, se clicou no botão de Favoritar/Deletar), realiza um novo fetch para renderizar uma nova frase
  componentDidUpdate() {
    const { newFavorite, favoriteQuotes } = this.state;
    if (newFavorite) {
      this.setState({
        newFavorite: false
      }, this.fetchQuote)
    }
    // adicionei o localStorage para salvar as frases favoritadas
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
  }
  
  render () {
    const { quote, author, isLoading, favoriteQuotes, } = this.state;

    // const content = {
    //   quote: quote || 'Loading...',
    //   author: author || 'Please, wait.',
    // }

    const content = {
      quote: quote,
      author: author,
    }

    // if (isLoading) {
    //   return (<ClipLoader
    //     color={"#000000"}
    //     loading={true}
    //     size={80}
    //     aria-label="Loading Spinner"
    //     data-testid="loader"
    //   />)
    // }

    return (
      <>
        <Header />
        <main>
          <h1>Lucky Quote</h1>
          <article>
            { 
            isLoading 
              ? (
              <ClipLoader
                color={"#000000"}
                loading={true}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              ) 
              : (
                <>
                    <Quote
                      content={content}
                      isFavorite={false}
                      handleFavorite={this.handleFavorite}
                    />
                    <button onClick={() => this.fetchQuote()}>New Quote</button>
                </>
              )
            }
          </article>
          <hr/>
          <h2>Favorite Quotes</h2>
          <section>
            {favoriteQuotes.map((quote, index) => (
              <Quote 
                key={index}
                content={quote}
                isFavorite={true}
                handleFavorite={this.handleFavorite}
              />
            ))}
          </section>
        </main>
      </>
    );
  }
}

export default App;
