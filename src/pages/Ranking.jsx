import RankingList from '../components/RankingList';

const PropTypes = require('prop-types');

const React = require('react');

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <RankingList />
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Jogar Novamente
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
