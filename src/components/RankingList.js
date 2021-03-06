const React = require('react');

class RankingList extends React.Component {
  constructor(props) {
    super(props);

    this.generateRowList = this.generateRowList.bind(this);

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.generateRowList();
  }

  generateRowList() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);

    this.setState({
      ranking: sortedRanking,
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <ol>
        { ranking.map((player, index) => (
          <li key={ index }>
            <span data-testid={ `player-name-${index}` }>{ player.name }</span>
            -
            <span data-testid={ `player-score-${index}` }>{ player.score }</span>
            <br/>
            <img alt={ `player-name-${player.name}` } src={ player.picture } />
          </li>
        )) }
      </ol>
    );
  }
}

export default RankingList;
