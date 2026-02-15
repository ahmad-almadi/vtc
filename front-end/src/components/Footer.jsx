import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Services', href: '#services' },
      { name: 'Portfolio', href: '#portfolio' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'Get Started', href: '#home' }
    ]
  };

  const socialLinks = [
    { icon: faGithub, href: '#', label: 'GitHub' },
    { icon: faLinkedin, href: '#', label: 'LinkedIn' },
    { icon: faTwitter, href: '#', label: 'Twitter' },
    { icon: faFacebook, href: '#', label: 'Facebook' }
  ];

  return (
    <footer className="relative z-10 bg-black/40 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.img 
                  src="/images/vtc-logo.avif" 
                  alt="VTC Logo" 
                  className="w-10 h-10 rounded-full"
                  animate={{ 
                    filter: [
                      "drop-shadow(0 0 8px rgba(255, 159, 252, 0.5))",
                      "drop-shadow(0 0 12px rgba(255, 159, 252, 0.7))",
                      "drop-shadow(0 0 8px rgba(255, 159, 252, 0.5))"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div>
                  <div className="text-lg font-bold text-white">VTC</div>
                  <div className="text-xs text-gray-400">Web Development</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Crafting premium responsive websites with cutting-edge technology and pixel-perfect design.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} className="text-vtc-neon" />
                  <a href="mailto:info@vtc.com" className="hover:text-vtc-neon transition-colors">
                    info@vtc.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FontAwesomeIcon icon={faPhone} className="text-vtc-neon" />
                  <a href="tel:+1234567890" className="hover:text-vtc-neon transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-vtc-neon" />
                  <span>123 Tech Street, Digital City</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-vtc-neon transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-vtc-neon transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-vtc-neon/20 hover:text-vtc-neon transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </motion.a>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.div
              className="text-gray-400 text-sm text-center md:text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p>© {currentYear} VTC. All rights reserved.</p>
              <p className="text-xs mt-1">
                Built with <span className="text-vtc-neon">❤</span> by VTC Team
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
