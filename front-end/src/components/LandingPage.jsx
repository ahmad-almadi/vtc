import LightRays from '../bg/LightRays';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import Portfolio from './Portfolio';
import Services from './Services';
import Team from './Team';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <div id="home" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#5B5CF6"
              raysSpeed={0.01}
              lightSpread={0.1}
              rayLength={1}
              followMouse
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
              pulsating={false}
              fadeDistance={0.81}
              saturation={1}
            />
          </div>

          <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
            <Hero />
          </div>
        </div>

        <AboutUs />
        <Services />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
