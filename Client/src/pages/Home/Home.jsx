import React from 'react';
import About from './home-components/About';
import Contact from './home-components/Contact';
import Hero from './home-components/Hero';

const Home = ({ handleLogin }) => {
  return (
    <div id='home'>
      <Hero handleLogin={handleLogin} />
      <About/>
      <Contact/>
    </div>
  );
};

export default Home;
