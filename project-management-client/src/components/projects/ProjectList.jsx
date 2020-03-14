// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddProject from './AddProject'; // <== !!!

class ProjectList extends Component {
  constructor() {
    super();
    this.state = { listOfProjects: [] };
  }

  getAllProjects = () => {
    axios.get(`http://localhost:5000/api/projects`).then(responseFromApi => {
      this.setState({
        listOfProjects: responseFromApi.data
      });
    });
  };

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100'
          }}
        >
          {this.state.listOfProjects.map(project => {
            return (
              <div key={project._id}>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                </Link>
                {/*  added so the tasks can be displayed:   */}
                <ul>
                  {project.tasks.map((task, index) => {
                    return <li key={index}>{task.title}</li>;
                  })}
                </ul>
                {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100'
          }}
        >
          <AddProject getData={() => this.getAllProjects()} /> {/* <== !!! */}
        </div>
      </div>
    );
  }
}

export default ProjectList;
