const React = require('react');

class RankingList extends React.Component {
  generateRowList() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);

    return (
      sortedRanking.map((player, index) => (
        <li key={ index }>
          <h1 data-testid={ `player-name-${index}` }>{ player.name }</h1>
          <h1 data-testid={ `player-score-${index}` }>{ player.score }</h1>
          <img alt={ `player-name-${player.name}` } src={ player.picture } />
        </li>
      ))
    );
  }

  render() {
    return (
      <ol>
        { this.generateRowList() }
      </ol>
    );
  }
}

export default RankingList;
