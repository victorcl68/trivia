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
  default:
    return state;
  }
};
