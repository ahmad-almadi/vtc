import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faMobileAlt, faRobot } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const services = [
  {
    icon: faCode,
    title: "Custom Web Development",
    description:
      "Full-stack solutions built with modern frameworks like React, Node.js, and TypeScript",
  },
  {
    icon: faMobileAlt,
    title: "Application Development",
    description:
      "Native and cross-platform mobile apps that deliver seamless experiences across all devices",
  },
  {
    icon: faRobot,
    title: "AI Automation",
    description:
      "Intelligent automation solutions powered by AI to streamline workflows and boost productivity",
  },
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(91, 92, 246, 0.3)",
              }}
              className="p-8 bg-vtc-card/50 backdrop-blur-md border border-vtc-border rounded-2xl group"
            >
              <motion.div>
                <FontAwesomeIcon
                  icon={service.icon}
                  className="w-12 h-12 text-vtc-indigo mb-4"
                />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-vtc-muted">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
