import { defineState } from 'redux-localstore';

const defaultState = {
  questions: [],
};

const INITIAL_STATE = defineState(defaultState)('questions');

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'QUEST':
    return {
      ...state,
      questions: action.state,
    };
  default:
    return state;
  }
};
