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
  }

  handleAnswers() {
    const { index } = this.state;
    const { questions } = this.props;
    const answers = [questions[index].correct_answer, ...questions[index].incorrect_answers];
    const sortAnswers = answers.sort();
    return (
      sortAnswers.map((answer) => (
        <button
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
          { questions[0].category }

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
