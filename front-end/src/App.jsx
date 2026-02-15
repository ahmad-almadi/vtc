import GridScan from './bg/GridScan';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import "./global.css";

function App() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* GridScan Background - Fixed position */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
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
      </div>
      
      {/* Content - Above background with alive 3D effects */}
      <div className="content-wrapper" style={{ perspective: '2000px' }}>
        <Navbar />
        <AliveSection delay={0}>
          <div id="home">
            <Hero />
          </div>
        </AliveSection>
        <AliveSection delay={0.1}>
          <AboutUs />
        </AliveSection>
        <AliveSection delay={0.2}>
          <Services />
        </AliveSection>
        <AliveSection delay={0.3}>
          <Portfolio />
        </AliveSection>
        <AliveSection delay={0.4}>
          <Team />
        </AliveSection>
        <AliveSection delay={0.5}>
          <Contact />
        </AliveSection>
        <Footer />
      </div>
    </div>
  );
}

function AliveSection({ children, delay }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const y = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]), springConfig);
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]), springConfig);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotateX,
        rotateY,
        scale,
        opacity,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export default App;
