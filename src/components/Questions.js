import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/Questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      isClicked: false,
    };

    this.onClick = this.onClick.bind(this);
    this.setClassName = this.setClassName.bind(this);
    this.setDataTestid = this.setDataTestid.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  onClick() {
    this.setState({ isClicked: true });
  }

  setClassName(answer) {
    const { questions } = this.props;
    const { index } = this.state;
    const incorrect = questions[index].incorrect_answers;
    if (incorrect.includes(answer)) {
      return 'wrong-answer';
    }
    return 'correct-answer';
  }

  setDataTestid(answer) {
    const { questions } = this.props;
    const { index } = this.state;
    const incorrect = questions[index].incorrect_answers;
    if (incorrect.includes(answer)) {
      const incorrectIndex = incorrect.indexOf(answer);
      return `wrong-answer-${incorrectIndex}`;
    }
    return 'correct-answer';
  }

  nextQuestion() {
    const { index } = this.state;
    const { questions, history } = this.props;
    if (index < questions.length - 1) {
      this.setState({
        index: index + 1,
        isClicked: false,
      });
    } else {
      history.push('/teste');
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
          data-testid={ this.setDataTestid(answer) }
          key={ answer }
          className={ isClicked ? this.setClassName(answer) : null }
          type="button"
          onClick={ this.onClick }
        >
          { unescape(answer) }
        </button>
      ))
    );
  }

  render() {
    const { isClicked, index } = this.state;
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Questions);
