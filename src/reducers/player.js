import { defineState } from 'redux-localstore';

const defaultState = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const INITIAL_STATE = defineState(defaultState)('player');

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.gravatarEmail,
      score: 0,
    };
  case 'SET_SCORE':
    localStorage.setItem('score', action.state.score);
    localStorage.setItem('assertions', action.state.assertions);
    return {
      ...state,
      score: action.state.score,
      assertions: action.state.assertions,
    };
  default:
    return state;
  }
};
