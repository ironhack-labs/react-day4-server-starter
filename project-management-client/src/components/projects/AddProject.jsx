// components/projects/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '' };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    axios
      .post('http://localhost:5000/api/projects', { title, description })
      .then(() => {
        this.props.getData();
        this.setState({ title: '', description: '' });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100'
        }}
      >
        <form
          onSubmit={this.handleFormSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100'
          }}
        >
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.handleChange(e)}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
