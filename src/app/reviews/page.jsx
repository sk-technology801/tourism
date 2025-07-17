
"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Search, Send, ChevronLeft, ChevronRight, MapPin, Filter, X, ArrowRight } from 'lucide-react';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', destination: '', rating: 0, comment: '' });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const itemsPerPage = 6;

  // Mock review data
  const mockReviews = useMemo(() => [
    {
      id: 1,
      name: "Emma Wilson",
      location: "London, UK",
      destination: "Bali Paradise Resort",
      rating: 5,
      comment: "An incredible experience! The resort was breathtaking, and the staff made our trip unforgettable.",
      date: "2025-06-15",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379f42f3?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Carlos Rivera",
      location: "Miami, USA",
      destination: "Swiss Alps Adventure",
      rating: 4,
      comment: "Thrilling adventure with stunning views. The guides were excellent, though the itinerary was packed.",
      date: "2025-05-20",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Mei Ling",
      location: "Singapore",
      destination: "Tokyo Cultural Immersion",
      rating: 5,
      comment: "A perfect blend of tradition and modernity. The sushi-making class was a highlight!",
      date: "2025-04-10",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop"
    },
    {
      id: 4,
      name: "James Patel",
      location: "Sydney, Australia",
      destination: "Serengeti Safari Lodge",
      rating: 5,
      comment: "The safari was a once-in-a-lifetime experience. Saw the Big Five and loved the luxury tents!",
      date: "2025-03-05",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Sophie Dubois",
      location: "Paris, France",
      destination: "Bali Paradise Resort",
      rating: 4,
      comment: "Beautiful resort, but the beach was crowded at times. The spa was exceptional.",
      date: "2025-02-12",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Ahmed Khan",
      location: "Dubai, UAE",
      destination: "Tokyo Cultural Immersion",
      rating: 5,
      comment: "The cultural tours were amazing, and the guides were so knowledgeable. Highly recommend!",
      date: "2025-01-25",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    }
  ], []);

  const destinations = useMemo(() => [
    { id: 'all', name: 'All Destinations' },
    { id: 'Bali Paradise Resort', name: 'Bali Paradise Resort' },
    { id: 'Swiss Alps Adventure', name: 'Swiss Alps Adventure' },
    { id: 'Tokyo Cultural Immersion', name: 'Tokyo Cultural Immersion' },
    { id: 'Serengeti Safari Lodge', name: 'Serengeti Safari Lodge' }
  ], []);

  const ratingOptions = useMemo(() => [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars & Up' },
    { value: '3', label: '3 Stars & Up' }
  ], []);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setReviews(mockReviews);
        setFilteredReviews(mockReviews);
        setLoading(false);
      } catch (err) {
        setFormError('Failed to load reviews');
        setLoading(false);
      }
    };

    initializeData();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mockReviews]);

  useEffect(() => {
    try {
      let filtered = [...reviews];

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(review =>
          review.name.toLowerCase().includes(searchLower) ||
          review.destination.toLowerCase().includes(searchLower) ||
          review.comment.toLowerCase().includes(searchLower)
        );
      }

      if (destinationFilter !== 'all') {
        filtered = filtered.filter(review => review.destination === destinationFilter);
      }

      if (ratingFilter !== 'all') {
        filtered = filtered.filter(review => review.rating >= parseInt(ratingFilter));
      }

      setFilteredReviews(filtered);
      setCurrentPage(1);
    } catch (err) {
      setFormError('Failed to filter reviews');
    }
  }, [searchTerm, destinationFilter, ratingFilter, reviews]);

  const handleReviewSubmit = useCallback((e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.destination || reviewForm.rating === 0 || !reviewForm.comment) {
      setFormError('Please fill in all fields and select a rating');
      return;
    }
    setFormError(null);
    setFormSuccess('Thank you for your review! It has been submitted.');
    setReviews(prev => [
      {
        id: prev.length + 1,
        name: reviewForm.name,
        location: "Unknown",
        destination: reviewForm.destination,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toISOString().split('T')[0],
        image: "https://images.unsplash.com/photo-1511367461989-2ff1c95a0a07?w=200&h=200&fit=crop"
      },
      ...prev
    ]);
    setReviewForm({ name: '', destination: '', rating: 0, comment: '' });
    setTimeout(() => setFormSuccess(null), 5000);
  }, [reviewForm]);

  const handleRatingSelect = useCallback((rating) => {
    setReviewForm(prev => ({ ...prev, rating }));
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  // Review Card Component
  const ReviewCard = React.memo(({ review }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-orange-600 hover:shadow-orange-600/50"
    >
      <div className="flex items-center mb-4">
        <img
          src={review.image}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
          loading="lazy"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{review.name}</h3>
          <p className="text-gray-400 text-sm">{review.location}</p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < review.rating ? 'text-orange-500 fill-current' : 'text-gray-600'}`}
          />
        ))}
        <span className="ml-2 text-gray-300 text-sm">{review.rating}/5</span>
      </div>
      <p className="text-gray-300 mb-2">{review.comment}</p>
      <div className="flex items-center justify-between text-gray-400 text-sm">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1 text-orange-500" />
          <span>{review.destination}</span>
        </div>
        <span>{review.date}</span>
      </div>
    </motion.div>
  ));

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
            Traveler Reviews
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Hear from our travelers about their unforgettable experiences with TravelScape.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-gradient-to-r from-orange-600 to-orange-800 text-white px-8 py-3 rounded-full hover:scale-105 transition-all"
          >
            Share Your Experience
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
            Submit Your Review
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-lg mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800"
          >
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
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label htmlFor="review-name" className="block text-gray-300 mb-1">Your Name</label>
                <input
                  id="review-name"
                  type="text"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  placeholder="Your Name"
                  aria-label="Your Name"
                />
              </div>
              <div>
                <label htmlFor="destination" className="block text-gray-300 mb-1">Destination</label>
                <select
                  id="destination"
                  value={reviewForm.destination}
                  onChange={(e) => setReviewForm({ ...reviewForm, destination: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                  aria-label="Select Destination"
                >
                  <option value="">Select a Destination</option>
                  {destinations.map(dest => (
                    <option key={dest.id} value={dest.name}>{dest.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Your Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <Star
                      key={rating}
                      className={`w-6 h-6 cursor-pointer ${rating <= reviewForm.rating ? 'text-orange-500 fill-current' : 'text-gray-600'}`}
                      onClick={() => handleRatingSelect(rating)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="comment" className="block text-gray-300 mb-1">Your Review</label>
                <textarea
                  id="comment"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  placeholder="Share your experience..."
                  rows="4"
                  aria-label="Your Review"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-full flex items-center justify-center hover:bg-orange-700 transition-all"
              >
                Submit Review <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      <section className="py-12 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
            >
              All Reviews
            </motion.h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center hover:bg-orange-600/50"
            >
              <Filter className="w-5 h-5 mr-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    aria-label="Search reviews"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                </div>
                <select
                  value={destinationFilter}
                  onChange={(e) => setDestinationFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                  aria-label="Select destination"
                >
                  {destinations.map(dest => (
                    <option key={dest.id} value={dest.id}>{dest.name}</option>
                  ))}
                </select>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                  aria-label="Select rating"
                >
                  {ratingOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading reviews...</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentReviews.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 col-span-full"
                >
                  <p className="text-gray-400">No reviews found.</p>
                </motion.div>
              ) : (
                currentReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))
              )}
            </div>
          )}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-8 gap-2"
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-gray-800 rounded-full text-white disabled:opacity-50 hover:bg-orange-600"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-full ${currentPage === index + 1 ? 'bg-orange-600 text-white' : 'bg-gray-800 text-white hover:bg-orange-600/50'}`}
                  aria-label={`Go to page ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-gray-800 rounded-full text-white disabled:opacity-50 hover:bg-orange-600"
                aria-label="Next page"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
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
            Share Your Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-200 mb-6"
          >
            Your feedback helps us create better experiences for travelers worldwide.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all"
          >
            Write a Review <ArrowRight className="w-5 h-5 inline ml-2" />
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;
