import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import logo from './logo.svg';
import './App.css';
import TasklistsContainer from './containers/tasklist/TasklistsContainer';
import NewTasklistsContainer from './containers/tasklist/NewTasklistsContainer';
import TasklistContainer from './containers/tasklist/TasklistContainer';
import UsersContainer from './containers/user/UsersContainer';
import UserContainer from './containers/user/UserContainer';
import NewUserContainer from './containers/user/NewUserContainer';
import TasksContainer from './containers/tasklist/task/TasksContainer';
import NewTaskContainer from './containers/tasklist/task/NewTaskContainer';
import TaskContainer from './containers/tasklist/task/TaskContainer';

/**
 * The structure of this project was build based in the knowledge aquired in the ReactJs
 * course in this link: https://www.udemy.com/course/react-js-redux-es6-completo-de-0-a-experto-espanol/
 * 
 * The file "index.css" was taken and modified from one of the project of the course.
 * 
 */
function App() {
  return (

    /**
     * Router configuration to manage when every component is shown.
     * Each component is shown when the url adrress matches with the path.
     * The url change as the user navigates through the app.
    */
    <Router>
      <div className="App">
        <div>
          <Route exact path="/" component={HomeContainer}></Route>
          <Route exact path="/tasklist" component={TasklistsContainer}></Route>
          <Switch>
            <Route path="/tasklist/new" component={NewTasklistsContainer}></Route>
            <Route path="/tasklist/:tasklistId"  
                    render= {props => <TasklistContainer tasklistId={props.match.params.tasklistId}></TasklistContainer> }></Route>
          </Switch>
        </div>
        <div>
          <Route exact path="/user" component={UsersContainer}></Route>
          <Switch>
            <Route path="/user/new" component={NewUserContainer}></Route>
            <Route path="/user/:userId"  
                    render= {props => <UserContainer userId={Number(props.match.params.userId)}></UserContainer> }></Route>
          </Switch>
        </div>
        <div>
          <Route exact path="/task" component={TasksContainer}></Route>
          <Switch>
            <Route path="/task/new" component={NewTaskContainer}></Route>
            <Route path="/task/:taskId"  
                    render= {props => <TaskContainer taskId={Number(props.match.params.taskId)}></TaskContainer> }></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
