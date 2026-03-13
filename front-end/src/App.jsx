import GridScan from "./bg/GridScan";
import Lightning from "./bg/Lightning";
import LightRays from './bg/LightRays';

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./global.css";

function App() {
  return (
    <div>
      <Navbar />

      {/* 1. Wrap Hero and LightRays in a relative container */}
      <div id="home" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        
        {/* 2. Position the canvas absolutely so it sits behind the Hero */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#5B5CF6"
            raysSpeed={0.01}
            lightSpread={0.1}
            rayLength={1}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={0.81}
            saturation={1}
          />
        </div>

        {/* 3. Give the Hero a higher z-index to sit on top */}
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
          <Hero />
        </div>
      </div>

      {/* The rest of your components flow normally below the Hero */}
      <AboutUs />
      <Services />
      <Portfolio />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;