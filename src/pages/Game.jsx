import Header from '../components/Header';
import Questions from '../components/Questions';

const React = require('react');

class Game extends React.Component {
  constructor() {
    super();
  }

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
