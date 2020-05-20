// components/tasks/TaskDetails.js

import React, { Component } from 'react';
import axios from 'axios';


class TaskDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheTask();
  }

  getTheTask = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/projects/${params.id}/tasks/${params.taskId}`)
    .then( responseFromApi =>{
      const theTask = responseFromApi.data;
      this.setState(theTask);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
      </div>
    )
  }
}

export default TaskDetails;
