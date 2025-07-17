
"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Heart, Award, ArrowRight, Users, Star } from 'lucide-react';

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
  <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center">
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
      className="text-lg text-gray-300 mb-8 max-w-2xl text-center mx-auto"
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
              Today, we are a global leader in tourism event planning, offering tailored experiences that cater to every traveler's dreams. From serene beaches to thrilling mountain adventures, we ensure every moment is crafted with care and expertise.
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
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="py-12 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-gray-900 rounded-xl p-6 text-center border border-gray-800 hover:border-orange-600 hover:shadow-orange-600/50"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-orange-500 mb-2">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
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
