import React from 'react';
import About from './home-components/About';
import Contact from './home-components/Contact';
import Hero from './home-components/Hero';

const Home = () => {
  return (
    <div id='home'>
      <Hero/>
      <About/>
      <Contact/>
    </div>
  );
};

export default Home;
