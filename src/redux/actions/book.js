// ActionTypes
export const SET_BOOK_REQUEST = 'SET_BOOK_REQUEST';
export const SET_BOOK_SUCCESS = 'SET_BOOK_SUCCESS';
export const SELECT_SUGGESTION = 'SELECT_SUGGESTION';
export const TOGGLE_BOOK = 'TOGGLE_BOOK';

// Ação REQUEST lançada pelo component => ação ouvida pela Saga => chamada à API => Ação SUCCESS => Será ouvido pelo Reducer

// Action creators

export const toggleBook = book => ({
  type: 'TOGGLE_BOOK',
  payload: {book},
});

export const selectSuggestion = suggestion => ({
  type: 'SELECT_SUGGESTION',
  payload: {suggestion},
});

export const loadBookRequest = book => ({
  type: 'SET_BOOK_REQUEST',
  payload: {book, bookId},
});

export const loadBookSuccess = data => ({
  type: 'SET_BOOK_SUCCESS',
  payload: {data},
});
