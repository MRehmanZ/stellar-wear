import React from 'react';
import './styles/heroes.css';

const Heroes = ({ title, subtitle, imageUrl, linkUrl }) => {
  return (
    <div className="hero-container">
      <video className="heroes-video" autoPlay loop muted playsInline>
        <source src="/LandingVideoPerfected.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="text-on-media">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a href={linkUrl} className="heroes-button">Shop Now</a>
      </div>
      <img className="heroes-image" src={imageUrl} alt="Hero Image" />
    </div>
  );
};

export default Heroes;
