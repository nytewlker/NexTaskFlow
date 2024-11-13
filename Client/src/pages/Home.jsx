import React from 'react';
import About from '../components/About';
import Contact from '../components/Contact';
import Hero from '../components/Hero';

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
