import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto text-center" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          className="flex flex-col items-center justify-center mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* <motion.div
            className="mb-4 mt-8"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FontAwesomeIcon
              icon={faCode}
              className="w-16 h-16 text-vtc-indigo"
            />
          </motion.div> */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            VTC
          </motion.h1>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6 pb-2 gradient-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Crafting Premium Responsive Websites
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-vtc-muted mb-8 max-w-2xl mx-auto "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          We transform ideas into stunning digital experiences with cutting-edge
          technology and pixel-perfect design
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <motion.a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-vtc-indigo to-vtc-violet rounded-lg font-semibold shadow-glow hover:shadow-glow-violet transition-shadow duration-300"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.a>
          <motion.a
            href="#portfolio"
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg font-semibold"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            View Our Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
