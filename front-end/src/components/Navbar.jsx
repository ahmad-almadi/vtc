import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-vtc-dark/90 backdrop-blur-lg border-b border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection("home")}
          >
            <motion.img
              src="/images/vtc-logo.avif"
              alt="VTC Logo"
              className="w-12 h-12 rounded-full"
              // animate={{
              //   filter: [
              //     "drop-shadow(0 0 8px rgba(255, 159, 252, 0.5))",
              //     "drop-shadow(0 0 16px rgba(255, 159, 252, 0.8))",
              //     "drop-shadow(0 0 8px rgba(255, 159, 252, 0.5))",
              //   ],
              // }}
              // transition={{
              //   duration: 2,
              //   repeat: Infinity,
              //   ease: "easeInOut",
              // }}
            />
            <div className="hidden sm:block">
              <div className="text-xl font-bold  bg-gradient-to-r from-vtc-neon to-purple-400 bg-clip-text text-transparent">
                VTC
              </div>
             
            </div>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.name.toLowerCase())}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.name.toLowerCase()
                    ? "text-vtc-neon"
                    : "text-gray-300 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
                {activeSection === link.name.toLowerCase() && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-vtc-neon to-purple-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 space-y-2 overflow-hidden"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setIsOpen(false);
                    setActiveSection(link.name.toLowerCase());
                  }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`block px-4 py-3 rounded-lg transition-all ${
                    activeSection === link.name.toLowerCase()
                      ? "bg-vtc-neon/20 text-vtc-neon border-l-4 border-vtc-neon"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
