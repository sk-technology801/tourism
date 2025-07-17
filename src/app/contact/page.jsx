
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, HelpCircle } from 'lucide-react';

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      question: "How do I book a trip with TravelScape?",
      answer: "Visit our Destinations page, select your preferred package, and click 'Plan Trip' to customize and book your journey. You can also contact us directly for personalized assistance."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 30 days before the trip receive a full refund. Within 30 days, a 50% refund applies. Contact us for specific details based on your booking."
    },
    {
      question: "Do you offer group discounts?",
      answer: "Yes, we offer discounts for groups of 5 or more. Please reach out via our contact form or call us to discuss group rates."
    },
    {
      question: "Are your tours eco-friendly?",
      answer: "We prioritize sustainability with eco-friendly accommodations, carbon-neutral transport options, and partnerships with local communities to minimize environmental impact."
    }
  ];

  const handleContactSubmit = useCallback((e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      setFormError('Please fill in all fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      setFormError('Please enter a valid email address');
      return;
    }
    setFormError(null);
    setFormSuccess('Your message has been sent! We’ll get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormSuccess(null), 5000);
  }, [contactForm]);

  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault();
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setFormError('Please enter a valid email address');
      return;
    }
    setFormError(null);
    setFormSuccess('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
    setTimeout(() => setFormSuccess(null), 5000);
  }, [newsletterEmail]);

  const toggleFaq = useCallback((index) => {
    setActiveFaq(activeFaq === index ? null : index);
  }, [activeFaq]);

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        className="fixed top-0 left-0 h-1 bg-orange-600 z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.2 }}
      />
     
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            We’re here to help you plan your dream adventure. Reach out with any questions or inquiries!
          </motion.p>
        </div>
      </section>
      <section className="py-12 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-orange-500 mb-4">Send Us a Message</h2>
              {formError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-orange-900/50 text-orange-200 p-3 rounded-lg mb-4 text-center"
                >
                  {formError}
                </motion.div>
              )}
              {formSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-900/50 text-green-200 p-3 rounded-lg mb-4 text-center"
                >
                  {formSuccess}
                </motion.div>
              )}
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="Your Name"
                    aria-label="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="Your Email"
                    aria-label="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-300 mb-1">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="Subject"
                    aria-label="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="Your Message"
                    rows="5"
                    aria-label="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 rounded-full flex items-center justify-center hover:bg-orange-700 transition-all"
                >
                  Send Message <Send className="w-5 h-5 ml-2" />
                </button>
              </form>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-orange-500 mb-4">Contact Information</h2>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-6 h-6 text-orange-500" />
                <span>support@travelscape.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-6 h-6 text-orange-500" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-6 h-6 text-orange-500" />
                <span>123 Travel Lane, Global City, World</span>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-orange-500 mb-2">Our Office</h3>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="bg-gray-900 rounded-xl h-64 flex items-center justify-center border border-gray-800"
                >
                  <MapPin className="w-12 h-12 text-orange-500 animate-pulse" />
                  <p className="text-gray-300 text-lg">Interactive Map (Placeholder - Integrate Mapbox or Leaflet)</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 rounded-xl border border-gray-800"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 flex justify-between items-center text-left text-orange-500 hover:bg-gray-800 transition-all"
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <HelpCircle className={`w-5 h-5 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: activeFaq === index ? 'auto' : 0, opacity: activeFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 text-gray-300">{faq.answer}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          >
            Subscribe to Our Newsletter
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-lg mx-auto"
          >
            <p className="text-gray-300 mb-4 text-center">Stay updated with the latest travel deals and destinations!</p>
            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-orange-900/50 text-orange-200 p-3 rounded-lg mb-4 text-center"
              >
                {formError}
              </motion.div>
            )}
            {formSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-900/50 text-green-200 p-3 rounded-lg mb-4 text-center"
              >
                {formSuccess}
              </motion.div>
            )}
            <form onSubmit={handleNewsletterSubmit} className="flex items-center space-x-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="Enter your email"
                aria-label="Newsletter Email"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-800">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready to Start Your Adventure?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-200 mb-6"
          >
            Contact us today to plan your next unforgettable journey with TravelScape.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all"
          >
            Plan Your Trip <ArrowRight className="w-5 h-5 inline ml-2" />
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
