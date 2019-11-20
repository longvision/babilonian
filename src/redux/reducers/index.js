import { combineReducers } from 'redux';

import book from '~/redux/reducers/book';
import auth from '~/redux/reducers/auth';
// import activity from './activity';

export default combineReducers({
  // book,
  auth
});
