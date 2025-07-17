"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MapPin, Users, Compass, Star, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Compass },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Destinations', href: '/destinations', icon: MapPin },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Reviews', href: '/reviews', icon: Star },
    { name: 'Contact', href: '/contact', icon: Phone }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-2xl' 
        : 'bg-gradient-to-r from-black via-gray-900 to-black'
    }`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </span>
            <span>24/7 Event Planning Support</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
              Free Consultation
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-orange-500" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  EventScape
                </h1>
                <p className="text-xs text-orange-400 font-medium tracking-wide">
                  TOURIST ADVENTURES
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group relative px-4 py-2 text-white hover:text-orange-400 transition-all duration-300 flex items-center space-x-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-medium">{link.name}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-300 group-hover:w-full"></div>
                  </a>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="relative px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Plan Your Event</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white hover:text-orange-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-black/98 backdrop-blur-md border-t border-orange-500/20 transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 visible transform translate-y-0' 
            : 'opacity-0 invisible transform -translate-y-4'
        }`}>
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-3 px-4 py-3 text-white hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </a>
              );
            })}
            <div className="pt-4 border-t border-orange-500/20">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
                Plan Your Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-4 right-20 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute top-8 right-40 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-60 w-1.5 h-1.5 bg-orange-300 rounded-full animate-ping delay-500"></div>
      </div>
    </header>
  );
};

export default Header;