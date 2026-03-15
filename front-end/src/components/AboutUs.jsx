import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faLightbulb, faUsers, faAward } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { aboutHighlights, siteConfig } from '../lib/siteConfig';

const iconMap = {
  rocket: faRocket,
  lightbulb: faLightbulb,
  users: faUsers,
  award: faAward,
};

const AboutUs = () => {
  return (
    <section id="about" className="py-20 px-4 bg-vtc-card/30" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          id="about-heading"
          className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="text-xl text-vtc-muted text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {siteConfig.aboutSummary}
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutHighlights.map((value, index) => (
            <motion.div
              key={index}
              className="p-6 bg-vtc-card/50 backdrop-blur-md border border-vtc-border rounded-xl text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: '#5B5CF6' }}
            >
              <motion.div
                animate={{ 
                  // rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <FontAwesomeIcon 
                  icon={iconMap[value.iconKey]} 
                  className="w-12 h-12 text-vtc-indigo mb-4 mx-auto" 
                />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-vtc-muted text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
