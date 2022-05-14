import { combineReducers } from 'redux';

import portfolio from './portfolio/reducer';
import currentStock from './currentStock/reducer';

export default combineReducers({
  currentStock,
  portfolio,
});
