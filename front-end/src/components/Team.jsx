import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Ahmad Al Madi',
    role: 'CEO & Founder',
    // github: 'https://github.com/ahmadalmadi',
    // linkedin: 'https://linkedin.com/in/ahmadalmadi'
  },
  {
    name: 'Omar Hirzallah',
    role: 'CTO & Co-Founder',
    // github: 'https://github.com/omarhirzallah',
    // linkedin: 'https://linkedin.com/in/omarhirzallah'
  },
  {
    name: 'Sarah Smadi',
    role: 'Lead Designer',
    // github: 'https://github.com/sarahjohnson',
    // linkedin: 'https://linkedin.com/in/sarahjohnson'
  },
  {
    name: 'Ahmad Hmoudah',
    role: 'Full Stack Developer',
    // github: 'https://github.com/michaelchen',
    // linkedin: 'https://linkedin.com/in/michaelchen'
  },
  {
    name: 'Mohammad Nairokh',
    role: 'Frontend Developer',
    // github: 'https://github.com/emmawilliams',
    // linkedin: 'https://linkedin.com/in/emmawilliams'
  },
  {
    name: 'Suhaip Abu-Zaineh',
    role: 'Backend Developer',
    // github: 'https://github.com/davidmartinez',
    // linkedin: 'https://linkedin.com/in/davidmartinez'
  },
  {
    name: 'Ahmad Emad',
    role: 'UI/UX Designer',
    // github: 'https://github.com/lisaanderson',
    // linkedin: 'https://linkedin.com/in/lisaanderson'
  },
  {
    name: 'kinda Mohammad',
    role: 'DevOps Engineer',
    // github: 'https://github.com/jamestaylor',
    // linkedin: 'https://linkedin.com/in/jamestaylor'
  }
];

const Team = () => {
  return (
    <section id="team" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16"
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
              className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                borderColor: '#FF9FFC',
                boxShadow: '0 10px 30px rgba(255, 159, 252, 0.3)'
              }}
            >
              {/* Icon Avatar */}
              <motion.div
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-vtc-neon to-purple-500 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FontAwesomeIcon icon={faUser} className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-vtc-neon text-sm mb-4">{member.role}</p>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <motion.a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-vtc-neon transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-vtc-neon transition-colors"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
