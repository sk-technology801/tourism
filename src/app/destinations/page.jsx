
"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Heart, Award, ArrowRight, Users, Star, Mail, Phone, Send, Calendar, MessageSquare } from 'lucide-react';

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

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

  const teamMembers = [
    {
      name: "Aisha Khan",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      description: "With a passion for travel and over 15 years in the industry, Aisha leads TravelScape with a vision for unforgettable journeys."
    },
    {
      name: "Liam Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      description: "Liam ensures seamless travel experiences, managing logistics and partnerships worldwide."
    },
    {
      name: "Sofia Martinez",
      role: "Cultural Experience Curator",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
      description: "Sofia designs immersive cultural tours, blending tradition with modern adventures."
    },
    {
      name: "Rahul Patel",
      role: "Sustainability Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      description: "Rahul champions eco-friendly travel, ensuring sustainable practices in every journey."
    }
  ];

  const values = [
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: "Global Exploration",
      description: "We connect you to destinations worldwide, from hidden gems to iconic landmarks."
    },
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      title: "Passion for Travel",
      description: "Our love for travel drives us to create personalized, heartfelt experiences."
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: "Excellence in Service",
      description: "Award-winning service ensures every trip is seamless and memorable."
    },
    {
      icon: <MapPin className="w-8 h-8 text-orange-500" />,
      title: "Sustainable Journeys",
      description: "We prioritize eco-friendly travel to preserve the beauty of our planet."
    }
  ];

  const testimonials = [
    {
      name: "Emma Wilson",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379f42f3?w=200&h=200&fit=crop",
      rating: 5,
      quote: "TravelScape made my Bali trip unforgettable! The itinerary was perfectly tailored, and the support was exceptional."
    },
    {
      name: "Carlos Rivera",
      location: "Miami, USA",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
      rating: 4,
      quote: "The Swiss Alps adventure was thrilling, with every detail handled flawlessly. Highly recommend!"
    },
    {
      name: "Mei Ling",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop",
      rating: 5,
      quote: "The Tokyo cultural tour was a perfect blend of tradition and modernity. TravelScape exceeded my expectations."
    }
  ];

  const milestones = [
    { year: 2015, event: "TravelScape Founded", description: "Aisha Khan launches TravelScape with a vision for personalized travel." },
    { year: 2018, event: "Global Expansion", description: "Expanded to offer destinations across 30+ countries." },
    { year: 2020, event: "Sustainability Pledge", description: "Committed to eco-friendly travel with carbon-neutral initiatives." },
    { year: 2023, event: "Award-Winning Service", description: "Received the Global Tourism Excellence Award." },
    { year: 2025, event: "50,000+ Happy Travelers", description: "Celebrated serving over 50,000 travelers worldwide." }
  ];

  const handleContactSubmit = useCallback((e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setFormError('Please fill in all fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      setFormError('Please enter a valid email address');
      return;
    }
    setFormError(null);
    setFormSuccess('Your message has been sent! We’ll get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
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

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        className="fixed top-0 left-0 h-1 bg-orange-600 z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.2 }}
      />
      <header className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-xl' : 'bg-gradient-to-r from-orange-600 to-orange-800'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="TravelScape Logo" className="h-12 w-auto rounded-full shadow-md" />
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-white"
            >
              TravelScape
            </motion.span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/destinations" className="hover:text-orange-300">Destinations</a>
            <a href="#" className="text-orange-300">About</a>
            <a href="#" className="hover:text-orange-300">Packages</a>
            <a href="#contact" className="hover:text-orange-300">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="bg-orange-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-orange-700">
              Plan Trip <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </header>
      <section className="pt-24 pb-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          >
            About TravelScape
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Discover the story behind TravelScape, where passion for travel meets unparalleled expertise to create your dream adventures.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-gradient-to-r from-orange-600 to-orange-800 text-white px-8 py-3 rounded-full hover:scale-105 transition-all"
          >
            Explore Destinations
          </motion.button>
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
            Our Story
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed"
          >
            <p className="mb-4">
              Founded in 2015, TravelScape was born from a dream to make travel accessible, immersive, and unforgettable. Our founder, Aisha Khan, traveled to over 50 countries, discovering the magic of cultural exchange and the beauty of diverse landscapes. This passion inspired TravelScape to curate personalized journeys that blend adventure, culture, and luxury.
            </p>
            <p>
              Today, we are a global leader in tourism event planning, offering tailored experiences that cater to every traveler's dreams. From serene beaches to thrilling mountain adventures, we ensure every moment is crafted with care and expertise, with a commitment to sustainability and cultural respect.
            </p>
          </motion.div>
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
            Our Milestones
          </motion.h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-orange-600 h-full"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} justify-between`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <h3 className="text-xl font-bold text-orange-500">{milestone.year} - {milestone.event}</h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-orange-600 rounded-full border-4 border-gray-900"></div>
                </div>
                <div className="w-5/12"></div>
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
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-600/50 transition-all"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-orange-500 mb-2">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
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
            What Our Travelers Say
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-gray-900 rounded-xl p-6 text-center border border-gray-800 hover:border-orange-600 hover:shadow-orange-600/50"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-orange-500 mb-1">{testimonial.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{testimonial.location}</p>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-orange-500 fill-current' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic">"{testimonial.quote}"</p>
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
            Our Global Reach
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative bg-gray-900 rounded-xl h-96 flex items-center justify-center border border-gray-800"
          >
            <MapPin className="w-12 h-12 text-orange-500 animate-pulse" />
            <p className="text-gray-300 text-lg">Interactive World Map (Placeholder - Integrate Mapbox or Leaflet)</p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-center text-gray-300 mt-4 max-w-2xl mx-auto"
          >
            We operate in over 50 countries, bringing you curated experiences across the globe. Stay tuned for our interactive map feature!
          </motion.p>
        </div>
      </section>
      <section id="contact" className="py-12 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          >
            Get in Touch
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
              <h3 className="text-xl font-semibold text-orange-500 mb-4">Contact Us</h3>
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
                  <label htmlFor="message" className="block text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="Your Message"
                    rows="4"
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
              <h3 className="text-xl font-semibold text-orange-500 mb-4">Contact Information</h3>
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
            </motion.div>
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
            Start Your Journey Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-200 mb-6"
          >
            Let TravelScape guide you to unforgettable destinations and experiences.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all"
          >
            Plan Your Adventure <ArrowRight className="w-5 h-5 inline ml-2" />
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
