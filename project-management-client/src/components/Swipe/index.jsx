import React, { Component } from 'react';
import './style.css';
import { Swipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';

class SwipeComponent extends React.Component {
  render() {
    var sidebar = 'hide';

    if (this.props.sidebar) {
      sidebar = 'show';
    }

    return (
      <Swipeable onSwipedRight={this.props.toggleSwipe}>
        <ul id="flyoutSidebar" className={sidebar} style={{ textDecoration: 'none' }}>
          <Link to="/projects">Projects</Link>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Lorem ipsum dolor sit amet</li>
        </ul>
      </Swipeable>
    );
  }
}

export default SwipeComponent;
