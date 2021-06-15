import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };

    this.handleAnswers = this.handleAnswers.bind(this);
    this.setDataTestid = this.setDataTestid.bind(this);
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

  handleAnswers() {
    const { index } = this.state;
    const { questions } = this.props;
    const answers = [...questions[index].incorrect_answers, questions[index].correct_answer];
    const sortAnswers = answers.sort();
    return (
      sortAnswers.map((answer) => (
        <button
          data-testid={ this.setDataTestid(answer) }

          type="button"
        >
          { unescape(answer) }
        </button>
      ))
    );
  }

  render() {
    const { questions } = this.props;
    return (

      <div>
        <h1
          data-testid="question-category"
        >
          { unescape(questions[0].category) }

        </h1>
        <span
          data-testid="question-text"

        >
          { unescape(questions[0].question) }
        </span>
        {this.handleAnswers()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions,

});

export default connect(mapStateToProps)(Questions);
