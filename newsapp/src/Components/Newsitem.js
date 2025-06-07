import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class Newsitem extends Component {
 

  render() {


    let {image , title ,  url ,desc } = this.props;
    return (
      <div className="news-card">
        <img src={image} className="news-card-image" alt="News thumbnail" />
        <div className="news-card-body">
          <h5 className="news-card-title">{title}</h5>
          <p className="news-card-text">{desc}</p>
          <a href={url} target="_blank" rel="noreferrer" className="read-more-btn">Read More</a>
        </div>
      </div>
    )
  }
}

Newsitem.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};
