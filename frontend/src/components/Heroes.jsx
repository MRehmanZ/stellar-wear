import React from 'react';
import './styles/heroes.css';

const Heroes = ({ title, subtitle, imageUrl, linkUrl }) => {
  return (
    <div className="hero-container">
      <img className="heroes-image" src={imageUrl} alt="Hero Image" />
      <div className="text-on-image">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a href={linkUrl} className="heroes-button">Shop Now</a>
      </div>
    </div>
  );
}

export default Heroes;
