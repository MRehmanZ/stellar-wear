import React from 'react';
import Heroes from './Heroes';

const Home = () => {
  return (
    <div>
      <Heroes
        title="Collection"
        subtitle="Explore the latest trends"
        imageUrl="/Hero.jpg"
        linkUrl="/shop-now"
      />
    </div>
  );
};

export default Home;
