"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Calendar, MapPin, Users, Compass, Star, Phone, 
  Play, ChevronRight, Award, Globe, Clock, Shield, Heart,
  ArrowRight, CheckCircle, TrendingUp, Camera, Music,
  Mountain, Plane, Car, Hotel, Utensils, Zap, Target,
  Eye, Sparkles, Gift, Crown, Gem, Flame, Rocket,
  Quote
} from 'lucide-react';

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Trigger stats animation when scrolled into view
      const statsSection = document.getElementById('stats');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setStatsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide for hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide for testimonials carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/', page: 'home', icon: Compass },
    { name: 'Events', href: '/events', page: 'events', icon: Calendar },
    { name: 'Destinations', href: '/destinations', page: 'destinations', icon: MapPin },
    { name: 'About', href: '/about', page: 'about', icon: Users },
    { name: 'Reviews', href: '/reviews', page: 'reviews', icon: Star },
    { name: 'Contact', href: '/contact', page: 'contact', icon: Phone }
  ];

  const heroSlides = [
    {
      title: "Unforgettable Adventures",
      subtitle: "Create magical moments that last a lifetime with our premium experiences",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop",
      cta: "Explore Adventures",
      badge: "Most Popular"
    },
    {
      title: "Corporate Excellence",
      subtitle: "Professional experiences that inspire teams and drive success",
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1920&h=1080&fit=crop",
      cta: "Plan Corporate Event",
      badge: "Business Choice"
    },
    {
      title: "Luxury Escapes",
      subtitle: "Premium destinations for discerning travelers seeking perfection",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      cta: "Discover Luxury",
      badge: "VIP Experience"
    },
    {
      title: "Cultural Immersion",
      subtitle: "Authentic experiences that connect you with local traditions",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d68e04?w=1920&h=1080&fit=crop",
      cta: "Explore Culture",
      badge: "Authentic"
    }
  ];

  const services = [
    {
      icon: Mountain,
      title: "Adventure Expeditions",
      description: "Extreme adventures for thrill-seekers seeking the ultimate adrenaline rush",
      features: ["Rock Climbing", "Bungee Jumping", "White Water Rafting", "Skydiving"],
      color: "from-orange-500 via-red-500 to-pink-500",
      bgGradient: "from-orange-500/20 to-red-500/10",
      price: "From $299",
      duration: "3-7 Days",
      rating: 4.9
    },
    {
      icon: Crown,
      title: "Luxury Experiences",
      description: "Premium travel planning with exclusive access to world-class destinations",
      features: ["Private Jets", "5-Star Hotels", "Michelin Dining", "VIP Access"],
      color: "from-purple-500 via-blue-500 to-cyan-500",
      bgGradient: "from-purple-500/20 to-blue-500/10",
      price: "From $1,999",
      duration: "5-14 Days",
      rating: 5.0
    },
    {
      icon: Sparkles,
      title: "Event Mastery",
      description: "Flawless event coordination for unforgettable celebrations and milestones",
      features: ["Wedding Planning", "Corporate Events", "Birthday Parties", "Anniversaries"],
      color: "from-green-500 via-teal-500 to-blue-500",
      bgGradient: "from-green-500/20 to-teal-500/10",
      price: "From $599",
      duration: "1-3 Days",
      rating: 4.8
    },
    {
      icon: Globe,
      title: "Global Destinations",
      description: "Carefully curated accommodations in the world's most stunning locations",
      features: ["Boutique Hotels", "Private Villas", "Luxury Resorts", "Unique Stays"],
      color: "from-pink-500 via-rose-500 to-red-500",
      bgGradient: "from-pink-500/20 to-rose-500/10",
      price: "From $199",
      duration: "2-10 Days",
      rating: 4.7
    },
    {
      icon: Utensils,
      title: "Culinary Journeys",
      description: "Gastronomic adventures with world-renowned chefs and exclusive dining",
      features: ["Chef's Table", "Wine Tastings", "Cooking Classes", "Food Tours"],
      color: "from-yellow-500 via-orange-500 to-red-500",
      bgGradient: "from-yellow-500/20 to-orange-500/10",
      price: "From $149",
      duration: "1-5 Days",
      rating: 4.9
    },
    {
      icon: Music,
      title: "Cultural Entertainment",
      description: "Immersive cultural experiences with live performances and local traditions",
      features: ["Live Shows", "Cultural Tours", "Art Galleries", "Music Festivals"],
      color: "from-indigo-500 via-purple-500 to-pink-500",
      bgGradient: "from-indigo-500/20 to-purple-500/10",
      price: "From $99",
      duration: "1-4 Days",
      rating: 4.6
    }
  ];

  const stats = [
    { number: "75K+", label: "Happy Travelers", icon: Users, color: "from-blue-500 to-purple-500" },
    { number: "2.5K+", label: "Events Planned", icon: Calendar, color: "from-green-500 to-teal-500" },
    { number: "150+", label: "Destinations", icon: MapPin, color: "from-orange-500 to-red-500" },
    { number: "20+", label: "Years Experience", icon: Award, color: "from-pink-500 to-rose-500" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Enthusiast",
      text: "EventScape transformed our corporate retreat into an unforgettable adventure. The attention to detail was incredible and every moment was perfectly orchestrated!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c6b8?w=100&h=100&fit=crop&crop=face",
      location: "New York, USA",
      event: "Adventure Expedition"
    },
    {
      name: "Michael Chen",
      role: "CEO, Tech Corp",
      text: "Professional, creative, and flawless execution. Our team bonding event exceeded all expectations and strengthened our company culture significantly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      location: "San Francisco, USA",
      event: "Corporate Excellence"
    },
    {
      name: "Emma Rodriguez",
      role: "Wedding Planner",
      text: "Their destination wedding planning service is phenomenal. Every detail was perfect, from the venue to the smallest decorative elements. Truly magical!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      location: "Miami, USA",
      event: "Luxury Experience"
    },
    {
      name: "James Wilson",
      role: "Food Blogger",
      text: "The culinary journey was absolutely extraordinary. Each restaurant was handpicked perfectly, and the exclusive chef experiences were once-in-a-lifetime.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      location: "Los Angeles, USA",
      event: "Culinary Journey"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Satisfaction Guarantee",
      description: "Your happiness is our priority"
    },
    {
      icon: Clock,
      title: "24/7 Premium Support",
      description: "Round-the-clock assistance"
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Recognized excellence in travel"
    },
    {
      icon: Heart,
      title: "Personalized Experiences",
      description: "Tailored to your unique preferences"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
     
      

          

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
            </div>
          ))}
        </div>

        {/* Dynamic Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-400/15 rounded-full blur-2xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-2000" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-orange-300/10 rounded-full blur-lg animate-pulse delay-3000" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 font-medium text-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              {heroSlides[currentSlide].badge}
            </div>

            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => handleNavClick('events')}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{heroSlides[currentSlide].cta}</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
              
              <button className="group flex items-center space-x-3 px-8 py-4 border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Watch Our Story</span>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="relative py-8 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-3 text-white">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{feature.title}</div>
                    <div className="text-xs text-white/90">{feature.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              Premium Experience Categories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our curated collection of extraordinary experiences designed to create lasting memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-105"
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 text-orange-400 fill-current" />
                          <span className="text-sm font-medium text-white">{service.rating}</span>
                        </div>
                        <div className="text-xs text-gray-400">{service.duration}</div>
                      </div>
                    </div>
                    
                    {/* Title and Description */}
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-orange-400">{service.price}</div>
                        <div className="text-xs text-gray-400">per person</div>
                      </div>
                      
                      <button 
                        onClick={() => handleNavClick('contact')}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4 text-orange-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative py-20 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 transform group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-4xl md:text-5xl font-bold text-white mb-2 ${
                    statsVisible ? 'animate-pulse' : ''
                  }`}>
                    {stat.number}
                  </div>
                  <div className="text-lg text-white/90 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-500">What Our Clients Say</h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-orange-500/20">
              <Quote className="w-16 h-16 text-orange-500 mb-6 mx-auto opacity-50" />
              
              <div className="text-center">
                <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-orange-500 fill-current" />
                  ))}
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full border-2 border-orange-500"
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-orange-500">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-400">{testimonials[currentTestimonial].location}</p>
                    <p className="text-orange-300 text-sm">{testimonials[currentTestimonial].event}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;