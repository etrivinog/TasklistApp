import { combineReducers } from 'redux';
import { users } from './users';
import { tasklists } from './tasklists';
import { tasks } from './tasks';
import { reducer as form} from 'redux-form';

export default combineReducers({
    users,
    tasklists,
    tasks,
    form,
});