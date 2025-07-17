"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Calendar, MapPin, Clock, Users, Star, Filter, Search, Heart, Share2, 
  ChevronLeft, ChevronRight, Play, Award, Shield, Zap, Globe, Camera, Gift, Bell, 
  User, ChevronDown, ArrowRight, TrendingUp, Eye, Sparkles, CheckCircle
} from 'lucide-react';

const EventsPage = () => {
  const [currentRoute, setCurrentRoute] = useState('events');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedDate, setSelectedDate] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedEventForBooking, setSelectedEventForBooking] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setNotifications(prev => [...prev.slice(-4), {
        id: Date.now(),
        message: `Someone just booked "${randomEvent.title}"`,
        time: new Date().toLocaleTimeString(),
        event: randomEvent,
        type: 'info'
      }]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedSlide((prev) => (prev + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (eventId) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleBooking = (event) => {
    setSelectedEventForBooking(event);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    if (selectedEventForBooking) {
      setNotifications(prev => [...prev, {
        id: Date.now(),
        message: `Booking confirmed for "${selectedEventForBooking.title}"!`,
        time: new Date().toLocaleTimeString(),
        event: selectedEventForBooking,
        type: 'success'
      }]);
      setShowBookingModal(false);
      setSelectedEventForBooking(null);
      setBookingData({});
    }
  };

  const handleShare = (event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this amazing event: ${event.title} at ${event.location}!`,
        url: window.location.href
      });
    } else {
      alert('Sharing is not supported on this device.');
    }
  };

  const events = [
    {
      id: 1,
      title: "Sunset Desert Safari",
      category: "adventure",
      date: "2025-07-25",
      time: "16:00",
      location: "Dubai Desert",
      price: 150,
      originalPrice: 180,
      image: "https://images.unsplash.com/photo-1571104508999-893933ded431?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1571104508999-893933ded431?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
      ],
      rating: 4.8,
      reviews: 324,
      capacity: 20,
      booked: 12,
      description: "Experience the magic of the desert with camel riding, sandboarding, and a traditional BBQ dinner under the stars. This adventure includes professional guides, all equipment, and transportation.",
      highlights: ["Camel Riding", "Sandboarding", "BBQ Dinner", "Cultural Show", "Professional Guide", "Transport Included"],
      duration: "6 hours",
      difficulty: "Easy",
      languages: ["English", "Arabic", "Hindi"],
      includes: ["Transportation", "Dinner", "Equipment", "Guide"],
      badges: ["Bestseller", "Eco-Friendly"],
      vendor: "Desert Adventures LLC",
      isPopular: true,
      discount: 17,
      lastBookedAgo: "2 minutes ago"
    },
    {
      id: 2,
      title: "City Food Tour",
      category: "culinary",
      date: "2025-07-26",
      time: "10:00",
      location: "Old Town",
      price: 85,
      originalPrice: 100,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"
      ],
      rating: 4.9,
      reviews: 156,
      capacity: 15,
      booked: 8,
      description: "Discover local flavors and hidden gems on this guided culinary journey through the historic old town. Meet local chefs and learn about traditional cooking techniques.",
      highlights: ["Local Cuisine", "Historic Sites", "Expert Guide", "7 Food Stops", "Chef Meet & Greet", "Recipe Cards"],
      duration: "4 hours",
      difficulty: "Easy",
      languages: ["English", "Spanish", "French"],
      includes: ["Food Tastings", "Beverages", "Guide", "Recipe Book"],
      badges: ["New", "Local Favorite"],
      vendor: "Foodie Adventures",
      isPopular: false,
      discount: 15,
      lastBookedAgo: "15 minutes ago"
    },
    {
      id: 3,
      title: "Mountain Hiking Adventure",
      category: "adventure",
      date: "2025-07-27",
      time: "07:00",
      location: "Rocky Mountains",
      price: 120,
      originalPrice: 150,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1464822759844-d150baec0493?w=400&h=300&fit=crop"
      ],
      rating: 4.7,
      reviews: 89,
      capacity: 12,
      booked: 6,
      description: "Challenge yourself with breathtaking mountain trails and panoramic views of the valley below. Professional guides ensure safety while you explore pristine wilderness.",
      highlights: ["Scenic Views", "Professional Guide", "Equipment Included", "Photography Stops", "Wildlife Spotting", "Lunch Included"],
      duration: "8 hours",
      difficulty: "Moderate",
      languages: ["English", "German"],
      includes: ["Equipment", "Lunch", "Guide", "First Aid"],
      badges: ["Adventure", "Photo Opportunity"],
      vendor: "Peak Explorers",
      isPopular: true,
      discount: 20,
      lastBookedAgo: "1 hour ago"
    },
    {
      id: 4,
      title: "Cultural Heritage Walk",
      category: "cultural",
      date: "2025-07-28",
      time: "14:00",
      location: "Historic District",
      price: 45,
      originalPrice: 60,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop"
      ],
      rating: 4.6,
      reviews: 203,
      capacity: 25,
      booked: 18,
      description: "Explore centuries of history through ancient architecture, museums, and storytelling. Learn about local traditions and cultural significance of historical landmarks.",
      highlights: ["Historical Sites", "Museum Access", "Local Stories", "Architecture", "Cultural Insights", "Souvenir Guide"],
      duration: "3 hours",
      difficulty: "Easy",
      languages: ["English", "Italian", "Spanish"],
      includes: ["Museum Entry", "Guide", "Audio Device", "Map"],
      badges: ["Cultural", "Educational"],
      vendor: "Heritage Tours Co",
      isPopular: false,
      discount: 25,
      lastBookedAgo: "30 minutes ago"
    },
    {
      id: 5,
      title: "Wine Tasting Experience",
      category: "culinary",
      date: "2025-07-29",
      time: "17:00",
      location: "Vineyard Valley",
      price: 95,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=300&fit=crop"
      ],
      rating: 4.8,
      reviews: 127,
      capacity: 18,
      booked: 14,
      description: "Savor premium wines paired with artisanal cheeses in a picturesque vineyard setting. Learn about wine production from expert sommeliers.",
      highlights: ["Wine Tasting", "Cheese Pairing", "Vineyard Tour", "Sommelier Guide", "Production Tour", "Take-Home Bottle"],
      duration: "3 hours",
      difficulty: "Easy",
      languages: ["English", "French", "Italian"],
      includes: ["Wine Tastings", "Cheese Plate", "Tour", "Souvenir"],
      badges: ["Premium", "Romantic"],
      vendor: "Vineyard Experiences",
      isPopular: true,
      discount: 21,
      lastBookedAgo: "5 minutes ago"
    },
    {
      id: 6,
      title: "Beach Water Sports",
      category: "adventure",
      date: "2025-07-30",
      time: "09:00",
      location: "Crystal Beach",
      price: 110,
      originalPrice: 140,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
      ],
      rating: 4.5,
      reviews: 178,
      capacity: 16,
      booked: 9,
      description: "Dive into excitement with jet skiing, parasailing, and snorkeling in crystal-clear waters. All equipment provided with certified instructors.",
      highlights: ["Jet Skiing", "Parasailing", "Snorkeling", "Beach Access", "Equipment Included", "Safety Briefing"],
      duration: "5 hours",
      difficulty: "Moderate",
      languages: ["English", "Spanish"],
      includes: ["Equipment", "Instruction", "Safety Gear", "Refreshments"],
      badges: ["Thrilling", "Water Sports"],
      vendor: "Ocean Adventures",
      isPopular: false,
      discount: 21,
      lastBookedAgo: "45 minutes ago"
    },
    {
      id: 7,
      title: "Photography Workshop",
      category: "cultural",
      date: "2025-07-31",
      time: "08:00",
      location: "Scenic Overlook",
      price: 75,
      originalPrice: 95,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
      ],
      rating: 4.7,
      reviews: 94,
      capacity: 10,
      booked: 5,
      description: "Master the art of landscape photography with professional photographers. Learn techniques for capturing stunning sunrise and golden hour shots.",
      highlights: ["Professional Instruction", "Sunrise Shoot", "Technique Training", "Equipment Tips", "Post-Processing", "Portfolio Review"],
      duration: "4 hours",
      difficulty: "Intermediate",
      languages: ["English"],
      includes: ["Instruction", "Equipment Use", "Editing Tips", "Certificate"],
      badges: ["Creative", "Skill Building"],
      vendor: "Photo Masters",
      isPopular: false,
      discount: 21,
      lastBookedAgo: "2 hours ago"
    },
    {
      id: 8,
      title: "Luxury Yacht Cruise",
      category: "luxury",
      date: "2025-08-01",
      time: "11:00",
      location: "Marina Bay",
      price: 285,
      originalPrice: 350,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
      ],
      rating: 4.9,
      reviews: 67,
      capacity: 20,
      booked: 16,
      description: "Experience ultimate luxury aboard a private yacht with gourmet dining, premium beverages, and breathtaking coastal views.",
      highlights: ["Private Yacht", "Gourmet Dining", "Premium Bar", "Coastal Views", "Professional Crew", "Swimming Stop"],
      duration: "6 hours",
      difficulty: "Easy",
      languages: ["English", "French", "Spanish"],
      includes: ["Yacht Charter", "Meals", "Beverages", "Crew", "Snorkeling Gear"],
      badges: ["Luxury", "Exclusive", "Premium"],
      vendor: "Elite Cruises",
      isPopular: true,
      discount: 19,
      lastBookedAgo: "10 minutes ago"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', count: events.length, icon: Globe },
    { id: 'adventure', name: 'Adventure', count: events.filter(e => e.category === 'adventure').length, icon: Zap },
    { id: 'culinary', name: 'Culinary', count: events.filter(e => e.category === 'culinary').length, icon: Gift },
    { id: 'cultural', name: 'Cultural', count: events.filter(e => e.category === 'cultural').length, icon: Award },
    { id: 'luxury', name: 'Luxury', count: events.filter(e => e.category === 'luxury').length, icon: Star }
  ];

  const navItems = [
    { id: 'home', name: 'Home', href: '/', active: false },
    { id: 'events', name: 'Events', href: '/events', active: true },
    { id: 'destinations', name: 'Destinations', href: '/destinations', active: false },
    { id: 'packages', name: 'Packages', href: '/packages', active: false },
    { id: 'about', name: 'About', href: '/about', active: false },
    { id: 'contact', name: 'Contact', href: '/contact', active: false }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest' }
  ];

  const featuredEvents = [
    {
      title: 'Luxury Yacht Cruise',
      description: 'Sail in style with gourmet dining and stunning coastal views.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
      cta: 'Book Now',
      category: 'Luxury'
    },
    {
      title: 'Sunset Desert Safari',
      description: 'Experience camel riding, sandboarding, and a BBQ under the stars.',
      image: 'https://images.unsplash.com/photo-1571104508999-893933ded431?w=1200&h=600&fit=crop',
      cta: 'Discover More',
      category: 'Adventure'
    },
    {
      title: 'City Food Tour',
      description: 'Explore local flavors with a guided culinary journey.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop',
      cta: 'Join Now',
      category: 'Culinary'
    }
  ];

  // Filter and sort events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
    const matchesDate = !selectedDate || event.date === selectedDate;
    return matchesSearch && matchesCategory && matchesPrice && matchesDate;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return new Date(b.date) - new Date(a.date);
      default: return b.isPopular - a.isPopular;
    }
  });

  const eventsPerPage = 9;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  const EventCard = ({ event }) => (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group relative">
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1">
        {event.badges.map((badge, index) => (
          <span key={index} className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            {badge}
          </span>
        ))}
        {event.discount > 0 && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{event.discount}%
          </span>
        )}
      </div>
      <div className="relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => toggleFavorite(event.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              favorites.includes(event.id) 
                ? 'bg-orange-500 text-white scale-110' 
                : 'bg-black/30 text-white hover:bg-orange-500'
            }`}
          >
            <Heart size={16} fill={favorites.includes(event.id) ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={() => handleShare(event)}
            className="p-2 bg-black/30 text-white rounded-full hover:bg-orange-500 transition-all duration-300 backdrop-blur-sm"
          >
            <Share2 size={16} />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                ${event.price}
              </span>
              {event.originalPrice > event.price && (
                <span className="bg-gray-800/80 text-gray-300 px-2 py-1 rounded text-xs line-through">
                  ${event.originalPrice}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-300 mt-1">
              {event.capacity - event.booked} spots left
            </div>
          </div>
          <div className="flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
            <Eye size={12} className="text-orange-500" />
            <span className="text-xs text-white">{event.reviews}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-orange-500/20 text-orange-500 px-2 py-1 rounded text-xs font-medium uppercase tracking-wide">
            {event.category}
          </span>
          <div className="flex items-center gap-1 text-orange-500">
            <Star size={12} fill="currentColor" />
            <span className="text-sm font-semibold">{event.rating}</span>
            <span className="text-gray-400 text-sm">({event.reviews})</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
          {event.title}
        </h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={16} />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock size={16} />
            <span className="text-sm">{event.time} • {event.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin size={16} />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Users size={16} />
            <span className="text-sm">{event.booked}/{event.capacity} booked</span>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Booking Progress</span>
            <span>{Math.round((event.booked / event.capacity) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(event.booked / event.capacity) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedEvent(event)}
            className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            Details
          </button>
          <button
            onClick={() => handleBooking(event)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
          >
            <ArrowRight size={16} />
            Book Now
          </button>
        </div>
        {event.lastBookedAgo && (
          <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Last booked {event.lastBookedAgo}
          </div>
        )}
      </div>
    </div>
  );

  const BookingModal = ({ event, onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Book {event.title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Number of Guests</label>
              <select 
                value={bookingData.guests || 1}
                onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
                className="w-full bg-gray-800 text-white rounded-lg px-3 py-2"
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contact Information</label>
              <input 
                type="email" 
                placeholder="Email address"
                value={bookingData.email || ''}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 mb-2"
              />
              <input 
                type="tel" 
                placeholder="Phone number"
                value={bookingData.phone || ''}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                className="w-full bg-gray-800 text-white rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Special Requests</label>
              <textarea 
                placeholder="Any special requirements or requests..."
                value={bookingData.requests || ''}
                onChange={(e) => setBookingData({ ...bookingData, requests: e.target.value })}
                className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 h-20 resize-none"
              ></textarea>
            </div>
            <div className="border-t border-gray-800 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">Total Cost</span>
                <span className="text-2xl font-bold text-orange-500">${event.price * (bookingData.guests || 1)}</span>
              </div>
              <button
                onClick={onConfirm}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EventModal = ({ event, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img 
              src={event.galleryImages[currentImageIndex]} 
              alt={event.title}
              className="w-full h-80 object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <button 
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + event.galleryImages.length) % event.galleryImages.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-orange-500/50"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % event.galleryImages.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-orange-500/50"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {event.galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-orange-500 scale-125' : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-orange-500/50"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-white">{event.title}</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(event.id)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    favorites.includes(event.id) ? 'bg-orange-500 text-white scale-110' : 'bg-black/30 text-white hover:bg-orange-500'
                  }`}
                >
                  <Heart size={20} fill={favorites.includes(event.id) ? 'currentColor' : 'none'} />
                </button>
                <button 
                  onClick={() => handleShare(event)}
                  className="p-2 bg-black/30 text-white rounded-full hover:bg-orange-500 transition-all duration-300"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full text-sm font-medium uppercase">
                {event.category}
              </span>
              <div className="flex items-center gap-1 text-orange-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-semibold">{event.rating}</span>
                <span className="text-gray-400 text-sm">({event.reviews} reviews)</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <Calendar size={18} />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <Clock size={18} />
                  <span>{event.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={18} />
                  <span>{event.booked}/{event.capacity} booked</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <Shield size={18} />
                  <span>Difficulty: {event.difficulty}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <Globe size={18} />
                  <span>Languages: {event.languages.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Award size={18} />
                  <span>Vendor: {event.vendor}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-6">{event.description}</p>
            <h3 className="text-xl font-semibold text-white mb-4">Highlights</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {event.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle size={16} className="text-orange-500" />
                  {highlight}
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {event.includes.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle size={16} className="text-orange-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-500">${event.price}</span>
                {event.originalPrice > event.price && (
                  <span className="text-gray-400 line-through ml-2">${event.originalPrice}</span>
                )}
              </div>
              <button
                onClick={() => handleBooking(event)}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
     

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-20 right-4 z-40 bg-gray-900 rounded-xl shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-400">No notifications</p>
          ) : (
            notifications.map(notification => (
              <div key={notification.id} className="flex items-start gap-2 mb-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'success' ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`}></div>
                <div>
                  <p className="text-sm text-gray-300">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/15 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-teal-300 to-purple-400 bg-clip-text text-transparent animate-fade-in">
            Discover Unforgettable Events
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore our curated selection of adventure, cultural, luxury, and culinary experiences.
          </p>
          <Link
            href="/contact"
            onClick={() => setCurrentRoute('contact')}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
          >
            Plan Your Event <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Featured Events Carousel */}
      <section className="relative py-16 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
            Featured Events
          </h2>
          <div className="relative">
            {featuredEvents.map((event, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentFeaturedSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              >
                <div
                  className="h-96 bg-cover bg-center rounded-3xl"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-3xl" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="inline-block px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-300 font-medium text-sm mb-4">
                    {event.category}
                  </span>
                  <h3 className="text-3xl font-bold mb-2">{event.title}</h3>
                  <p className="text-lg text-gray-300 mb-4">{event.description}</p>
                  <Link
                    href="/contact"
                    onClick={() => setCurrentRoute('contact')}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    {event.cta} <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center space-x-2 mt-8">
              {featuredEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeaturedSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFeaturedSlide ? 'bg-teal-500 scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="relative py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Filter size={20} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className={`w-full md:w-auto ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-400" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-400 mt-1">$0 - ${priceRange[1]}</div>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-full text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* View Mode Toggle */}
      <section className="relative py-4 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg ${viewMode === 'grid' ? 'bg-teal-500 text-white' : 'bg-gray-800 text-gray-300'} hover:bg-teal-500/50 transition-colors`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg ${viewMode === 'list' ? 'bg-teal-500 text-white' : 'bg-gray-800 text-gray-300'} hover:bg-teal-500/50 transition-colors`}
            >
              List
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="relative py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
            All Events
          </h2>
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
            {currentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-12">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-gray-900/80 rounded-full text-white disabled:opacity-50 hover:bg-teal-500/50 transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-gray-900/80 text-white hover:bg-teal-500/50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-gray-900/80 rounded-full text-white disabled:opacity-50 hover:bg-teal-500/50 transition-colors duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="relative py-16 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
            Explore Event Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative p-6 rounded-3xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 hover:border-teal-500/50 transition-all duration-500 hover:scale-105 ${
                    selectedCategory === category.id ? 'border-teal-500/50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-400">{category.count} events available</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events Timeline */}
      <section className="relative py-16 bg-gradient-to-r from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
            Upcoming Events Timeline
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-teal-500/50"></div>
            {events.slice(0, 4).map((event, index) => (
              <div
                key={event.id}
                className={`relative mb-12 flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2 px-4">
                  <div className={`p-6 rounded-3xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 hover:border-teal-500/50 transition-all duration-500 animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}`}>
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-400 mb-4">{event.description}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar className="w-4 h-4 text-teal-400" />
                      <span className="text-sm text-gray-300">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-teal-400" />
                      <span className="text-sm text-gray-300">{event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Modals */}
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      {showBookingModal && selectedEventForBooking && (
        <BookingModal 
          event={selectedEventForBooking} 
          onClose={() => setShowBookingModal(false)} 
          onConfirm={confirmBooking}
        />
      )}
    </div>
  );
};

export default EventsPage;