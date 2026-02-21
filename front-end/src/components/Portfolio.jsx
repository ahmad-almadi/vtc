import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const Portfolio = () => {
  // Static projects data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern shopping experience with React & Node.js",
      techStack: ["React", "Node.js", "PostgreSQL", "Stripe"],
      imageUrl: "/images/e-commerce-proj.webp", // Place your image in public/images/
      liveUrl: "https://glamora.up.railway.app",
      githubUrl: "https://github.com/ahmad-almadi/glamora",
    },
    {
      id: 2,
      title: "SaaS Dashboard",
      description: "Analytics dashboard with real-time data",
      techStack: ["React", "TypeScript", "Express"],
      imageUrl: "/images/saas.webp",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/vtc/dashboard",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Creative portfolio with stunning animations",
      techStack: ["React", "Three.js", "Tailwind"],
      imageUrl: "/images/portfolio-proj.webp",
      liveUrl: "https://ahmadalmadi-portfolio.netlify.app",
      githubUrl: "https://github.com/ahmad-almadi/Portfolio",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Interactive portfolio with captivating visuals",
      techStack: ["html", "php", "bootstrap"],
      imageUrl: "/images/flow-proj.webp",
      liveUrl: "https://flowofpurity.com",
      githubUrl: "https://github.com/vtc/portfolio",
    },
    {
      id: 5,
      title: "Portfolio Website",
      description:
        "A modern interactive portfolio crafted with stunning visuals and smooth animations",
      techStack: ["Next.js", "Vite", "Tailwind"],
      imageUrl: "/images/doctor-proj.webp",
      liveUrl: "https://doctor-fral.vercel.app",
      githubUrl: "https://github.com/ahmad-almadi/doctor",
    },
    {
      id: 6,
      title: "Portfolio Website",
      description:
        "An engaging portfolio that blends stunning visuals with smooth, fluid animations.",
      techStack: ["Next.js", "Three.js", "Tailwind"],
      imageUrl: "/images/beauty-lounge-proj.webp",
      liveUrl: "https://beatuty-lounge-production.up.railway.app",
      githubUrl: "https://github.com/ahmad-almadi/beauty-lounge",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0, rotateY: -90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateZ: index % 2 === 0 ? -1 : 1,
                boxShadow: "0 25px 50px rgba(255, 159, 252, 0.4)",
              }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x300/392e4e/FF9FFC?text=${project.title}`;
                  }}
                />
              </motion.div>

              <div className="p-6">
                <motion.h3
                  className="text-xl font-bold mb-2"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-gray-300 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 bg-vtc-neon/20 text-vtc-neon text-sm rounded-full"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(255, 159, 252, 0.3)",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-vtc-neon"
                      whileHover={{ scale: 1.1, x: 5 }}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                      Live
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-vtc-neon"
                      whileHover={{ scale: 1.1, x: 5 }}
                    >
                      <FontAwesomeIcon icon={faGithub} />
                      Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
