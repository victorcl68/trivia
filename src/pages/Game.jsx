import Header from '../components/Header';
import Questions from '../components/Questions';

const React = require('react');

class Game extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Questions />
      </>
    );
  }
}

export default Game;
