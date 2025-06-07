import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Navbar extends Component {
  static propTypes = {
    onCategoryChange: PropTypes.func.isRequired,
    activeCategory: PropTypes.string.isRequired,
  };

  render() {
    const { onCategoryChange, activeCategory } = this.props;

    const categories = [
      { name: 'General', path: 'general' },
      { name: 'Business', path: 'business' },
      { name: 'Entertainment', path: 'entertainment' },
      { name: 'Health', path: 'health' },
      { name: 'Science', path: 'science' },
      { name: 'Sports', path: 'sports' },
      { name: 'Technology', path: 'technology' },
    ];

    return (
      <nav className="navbar-top">
        <div className="navbar-container">
          <a className="navbar-brand" href="/">NEWSAPP</a>
          <ul className="navbar-nav">
            {categories.map((category) => (
              <li className="nav-item" key={category.path}>
                <a 
                  className={`nav-link ${activeCategory === category.path ? 'active' : ''}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onCategoryChange(category.path);
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}
