import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { teamMembers } from '../lib/siteConfig';

const Team = () => {
  return (
    <section id="team" className="py-20 px-4" aria-labelledby="team-heading">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          id="team-heading"
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Team
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="p-6 bg-vtc-card/50 backdrop-blur-md border border-vtc-border rounded-xl text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.11 }}
              whileHover={{ 
                scale: 1.05,
                borderColor: '#5B5CF6',
                boxShadow: '0 10px 30px rgba(91, 92, 246, 0.3)'
              }}
            >
              {/* Icon Avatar */}
              <motion.div
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-vtc-indigo to-vtc-violet rounded-full flex items-center justify-center"
                // whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FontAwesomeIcon icon={faUser} className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-vtc-indigo text-sm mb-4">{member.role}</p>

              {/* Social Links */}
              {/* <div className="flex justify-center gap-4">
                <motion.a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vtc-muted hover:text-vtc-indigo transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vtc-muted hover:text-vtc-indigo transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                </motion.a>
              </div> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
