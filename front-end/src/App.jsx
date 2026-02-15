import GridScan from "./bg/GridScan";
import Lightning from "./bg/Lightning";

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
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* GridScan Background - Fixed position */}
      {/* <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div> */}
      <div style={{ width: "100%", height: "100vh", position: "fixed" }}>
        <Lightning hue={260} xOffset={0} speed={1} intensity={1} size={1} />
      </div>

      {/* Content - Above background */}
      <div className="content-wrapper">
        <Navbar />
        <div id="home">
          <Hero />
        </div>
        <AboutUs />
        <Services />
        <Portfolio />
        <Team />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
