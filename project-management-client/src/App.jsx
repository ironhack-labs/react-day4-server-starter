// App.js

import React, { Component } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ProjectList from './components/projects/ProjectList';
import Navbar from './components/NavBar';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails'; // <== import the TaskDetails component

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/projects" component={ProjectList} />
          <Route exact path="/projects/:id" component={ProjectDetails} />
          {/* added to display task details page: */}
          <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} /> {/* <== !!! */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
