import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">IoT Device Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Devices</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Device Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/account" className="nav-link">Create Account</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}