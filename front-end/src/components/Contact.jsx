import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEnvelope, faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { apiRequest } from '../lib/api';
import { siteConfig } from '../lib/siteConfig';

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
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus(error.message || 'Network error. Please try again.');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          id="contact-heading"
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text pb-2"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {siteConfig.contactHeading}
        </motion.h2>

        <motion.p
          id="contact-intro"
          className="mb-10 text-center text-lg text-vtc-muted"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {siteConfig.contactDescription}
        </motion.p>
        
        <motion.form 
          onSubmit={handleSubmit}
          aria-describedby="contact-intro"
          className="bg-vtc-card/50 backdrop-blur-md border border-vtc-border rounded-2xl p-8"
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
            <label htmlFor="contact-name" className="flex items-center gap-2 text-vtc-muted mb-2">
              <FontAwesomeIcon icon={faUser} />
              Name
            </label>
            <motion.input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-vtc-bg border border-vtc-border rounded-lg focus:border-vtc-indigo focus:ring-1 focus:ring-vtc-indigo focus:outline-none transition-colors"
              placeholder="Your name"
              whileFocus={{ scale: 1.02, borderColor: "#5B5CF6" }}
            />
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="contact-email" className="flex items-center gap-2 text-vtc-muted mb-2">
              <FontAwesomeIcon icon={faEnvelope} />
              Email
            </label>
            <motion.input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-vtc-bg border border-vtc-border rounded-lg focus:border-vtc-indigo focus:ring-1 focus:ring-vtc-indigo focus:outline-none transition-colors"
              placeholder="your@email.com"
              whileFocus={{ scale: 1.02, borderColor: "#5B5CF6" }}
            />
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="contact-message" className="flex items-center gap-2 text-vtc-muted mb-2">
              <FontAwesomeIcon icon={faCommentDots} />
              Message
            </label>
            <motion.textarea
              id="contact-message"
              name="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows="5"
              className="w-full px-4 py-3 bg-vtc-bg border border-vtc-border rounded-lg focus:border-vtc-indigo focus:ring-1 focus:ring-vtc-indigo focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your project..."
              whileFocus={{ scale: 1.02, borderColor: "#5B5CF6" }}
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-8 py-4 bg-gradient-to-r from-vtc-indigo to-vtc-violet rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(91, 92, 246, 0.5)" }}
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
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              Message sent successfully!
            </motion.p>
          )}
          {status && status !== 'success' && status !== 'sending' && (
            <motion.p 
              className="mt-4 text-red-400 text-center"
              role="alert"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {status}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
