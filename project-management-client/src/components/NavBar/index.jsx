// components/navbar/Navbar.js

import React, { Component } from 'react';
import Menu from './../Menu';
import MenuButton from './../MenuButton';
import { Link } from 'react-router-dom';
import { Swipeable } from 'react-swipeable';
import SwipeComponent from './../Swipe';

class Navbar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      sidebar: false
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSwipe = this.toggleSwipe.bind(this);
  }
  handleMouseDown() {
    //https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm how to do the sidebar
    this.toggleMenu();
    // e.stopPropagation();
  }

  toggleMenu() {
    this.setState({
      visible: !this.state.visible
    });
  }
  toggleSwipe() {
    console.log(this.state.sidebar);
    this.setState({
      sidebar: !this.state.sidebar
    });
  }
  render() {
    return (
      <nav
        className="nav-style"
        style={{ display: 'flex', justifyContent: 'space-between', width: '100' }}
      >
        <MenuButton handleMouseDown={this.handleMouseDown} />
        <Menu handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible} />
        <SwipeComponent toggleSwipe={this.toggleSwipe} sidebar={this.state.sidebar} />
        <Swipeable onSwipedLeft={this.toggleSwipe}>
          <li></li>
          <li></li>
        </Swipeable>
      </nav>
    );
  }
}

export default Navbar;
