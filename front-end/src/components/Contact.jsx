import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEnvelope, faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text pb-2"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's Build Something Amazing
        </motion.h2>
        
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="mb-6"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <FontAwesomeIcon icon={faUser} />
              Name
            </label>
            <motion.input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-vtc-neon focus:outline-none transition-colors"
              placeholder="Your name"
              whileFocus={{ scale: 1.02, borderColor: "#FF9FFC" }}
            />
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <FontAwesomeIcon icon={faEnvelope} />
              Email
            </label>
            <motion.input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-vtc-neon focus:outline-none transition-colors"
              placeholder="your@email.com"
              whileFocus={{ scale: 1.02, borderColor: "#FF9FFC" }}
            />
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <FontAwesomeIcon icon={faCommentDots} />
              Message
            </label>
            <motion.textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows="5"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-vtc-neon focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your project..."
              whileFocus={{ scale: 1.02, borderColor: "#FF9FFC" }}
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-8 py-4 bg-gradient-to-r from-vtc-neon to-purple-500 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 159, 252, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </motion.button>

          {status === 'success' && (
            <motion.p 
              className="mt-4 text-green-400 text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              Message sent successfully!
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p 
              className="mt-4 text-red-400 text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              Failed to send. Please try again.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
