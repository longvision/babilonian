import {TOGGLE_BOOK, SELECT_SUGGESTION} from '~/redux/actions/book';

const INITIAL_STATE = {
  data: [],
  loading: false,
  selectedBook: {},
  suggestedBook: {},
};

export default function book(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_BOOK:
      return {
        ...state,
        selectedBook: action.payload.book,
      };
    case SELECT_SUGGESTION:
      return {
        ...state,
        suggestedBook: action.payload.suggestion,
      };

    default:
      return state;
  }
}
console.tron.log(book);
