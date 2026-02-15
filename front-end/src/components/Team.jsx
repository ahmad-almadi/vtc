import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const Team = () => {
  const team = [
    {
      name: 'Ahmad Al Madi',
      role: 'CEO & Founder',
      image: './images/ahmad.jpg',
      social: {
        github: '#',
        linkedin: '#',
      }
    },
 
 
    {
      name: 'Omar Hirzallah',
      role: 'CEO & Founder',
      image: './images/omar.jpg',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <section id="team" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Team
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 ">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 159, 252, 0.3)"
              }}
            >
              <motion.div 
                className="relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-80 object-cover object-[50%_30%]"
                />
              </motion.div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-vtc-neon text-sm mb-4">{member.role}</p>

                <div className="flex justify-center gap-4">
                  <motion.a
                    href={member.social.github}
                    whileHover={{ scale: 1.2, color: '#FF9FFC' }}
                    className="text-gray-400"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </motion.a>
                  <motion.a
                    href={member.social.linkedin}
                    whileHover={{ scale: 1.2, color: '#FF9FFC' }}
                    className="text-gray-400"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </motion.a>
                 
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
