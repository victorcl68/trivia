import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerScore } from '../actions';

import '../css/Questions.css';

const TIMER = 30;
const CORRECT = 'correct-answer';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      isClicked: false,
      timer: TIMER,
      score: 0,
      assertions: 0,
    };

    this.onClick = this.onClick.bind(this);
    this.setClassName = this.setClassName.bind(this);
    this.setDataTestid = this.setDataTestid.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.defineInterval = this.defineInterval.bind(this);
    this.checkInterval = this.checkInterval.bind(this);
    this.getScore = this.getScore.bind(this);
    this.multiplier = this.multiplier.bind(this);
  }

  componentDidMount() {
    this.defineInterval();
  }

  onClick(event) {
    this.setState({ isClicked: true });
    this.getScore(event);
  }

  setClassName(answer) {
    const { questions } = this.props;
    const { index } = this.state;
    const incorrect = questions[index].incorrect_answers;
    if (incorrect.includes(answer)) {
      return 'wrong-answer';
    }
    return CORRECT;
  }

  setDataTestid(answer) {
    const { questions } = this.props;
    const { index } = this.state;
    const incorrect = questions[index].incorrect_answers;
    if (incorrect.includes(answer)) {
      const incorrectIndex = incorrect.indexOf(answer);
      return `wrong-answer-${incorrectIndex}`;
    }
    return CORRECT;
  }

  getScore({ target }) {
    if (target.id === CORRECT) {
      const { index, timer, score, assertions } = this.state;
      const { questions, sendPlayerScore } = this.props;
      const { difficulty } = questions[index];
      const multiplier = this.multiplier(difficulty);
      const RIGHT_ANSWER = 10;
      const questionScore = RIGHT_ANSWER + (timer * multiplier);

      this.setState({
        score: score + questionScore, assertions: assertions + 1,
      }, () => {
        const { score: newScore, assertions: newAssertion } = this.state;
        sendPlayerScore({ score: newScore, assertions: newAssertion });
      });
    }
  }

  multiplier(difficulty) {
    const THREE = 3;
    const TWO = 2;
    const ONE = 1;
    switch (difficulty) {
    case 'hard':
      return THREE;
    case 'medium':
      return TWO;
    case 'easy':
      return ONE;
    default:
      return ONE;
    }
  }

  defineInterval() {
    const ONE_SECOND = 1000;
    setInterval(this.checkInterval, ONE_SECOND);
  }

  checkInterval() {
    const { timer, isClicked } = this.state;

    if (timer === 0 || isClicked) {
      // this.getScore();
      this.setState({ isClicked: true });
      return clearInterval();
    }
    this.setState({ timer: timer - 1 });
  }

  nextQuestion() {
    const { index } = this.state;
    const { questions, history } = this.props;
    if (index < questions.length - 1) {
      this.setState({
        index: index + 1,
        isClicked: false,
        timer: TIMER,
      });
    } else {
      history.push('/feedback');
    }
  }

  handleAnswers() {
    const { index, isClicked } = this.state;
    const { questions } = this.props;
    const answers = [
      ...questions[index].incorrect_answers,
      questions[index].correct_answer,
    ];
    const sortAnswers = answers.sort();
    return (
      sortAnswers.map((answer) => (
        <button
          id={ this.setClassName(answer) }
          data-testid={ this.setDataTestid(answer) }
          key={ answer }
          className={ isClicked ? this.setClassName(answer) : null }
          type="button"
          disabled={ isClicked }
          onClick={ this.onClick }
        >
          { unescape(answer) }
        </button>
      ))
    );
  }

  render() {
    const { timer, isClicked, index } = this.state;
    const { questions } = this.props;

    return (

      <div>
        <h1 data-testid="question-category">
          { unescape(questions[index].category) }
        </h1>
        <span data-testid="question-text">
          { unescape(questions[index].question) }
        </span>

        {this.handleAnswers()}

        { isClicked
          ? (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.nextQuestion }
            >
              Próxima
            </button>)
          : null }

        <p>{ timer }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  sendPlayerScore: (state) => dispatch(playerScore(state)),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
  sendPlayerScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
