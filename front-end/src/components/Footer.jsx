import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import {
  footerCompanyLinks,
  footerSupportLinks,
  siteConfig,
  socialProfiles,
} from '../lib/siteConfig';

const socialIconMap = {
  instagram: faInstagram,
  facebook: faFacebook,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-vtc-border bg-vtc-card/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="mb-4 flex items-center gap-3">
                <motion.img
                  src={siteConfig.images.logo}
                  alt={`${siteConfig.name} logo`}
                  className="h-10 w-10 rounded-full"
                  loading="lazy"
                  decoding="async"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 8px rgba(91, 92, 246, 0.5))',
                      'drop-shadow(0 0 12px rgba(91, 92, 246, 0.7))',
                      'drop-shadow(0 0 8px rgba(91, 92, 246, 0.5))',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <div>
                  <div className="text-lg font-bold text-vtc-text">{siteConfig.name}</div>
                  <div className="text-xs text-vtc-muted">Web Development</div>
                </div>
              </div>

              <p className="mb-4 text-sm text-vtc-muted">{siteConfig.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-vtc-muted">
                  <FontAwesomeIcon icon={faEnvelope} className="text-vtc-indigo" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="transition-colors hover:text-vtc-indigo"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-vtc-muted">
                  <FontAwesomeIcon icon={faPhone} className="text-vtc-indigo" />
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="transition-colors hover:text-vtc-indigo"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-vtc-muted">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-vtc-indigo" />
                  <span>{siteConfig.contact.locationLabel}</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-4 font-semibold text-vtc-text">Quick Links</h3>
            <ul className="space-y-2">
              {footerCompanyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block text-sm text-vtc-muted transition-colors hover:text-vtc-indigo"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-4 font-semibold text-vtc-text">Get in Touch</h3>
            <ul className="space-y-2">
              {footerSupportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block text-sm text-vtc-muted transition-colors hover:text-vtc-indigo"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-vtc-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {socialProfiles.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-vtc-card text-vtc-muted transition-all hover:bg-vtc-indigo/20 hover:text-vtc-indigo"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={socialIconMap[social.iconKey]} />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="text-center text-sm text-vtc-muted md:text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
              <p className="mt-1 text-xs">
                Built with <span className="text-vtc-indigo">love</span> by the VTC team
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
