export const TOGGLE_ACTIVITY = 'TOGGLE_ACTIVITY';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';

// Ação REQUEST lançada pelo component => ação ouvida pela Saga => chamada à API => Ação SUCCESS => Será ouvido pelo Reducer

// Action creators

export const toggleActivity = selectedActivity => ({
  type: 'TOGGLE_ACTIVITY',
  payload: {selectedActivity},
});
