import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaBookmark, FaRegBookmark, FaEllipsisH, FaUserSecret, FaSearch, FaPlus } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AllPost = () => {
  // Fake data matching SilentVoices theme with English content
  const allPostsData = [
    {
      id: 1,
      title: "Corruption Allegations in Local Government Office",
      shortDesc: "Allegations of financial irregularities in a local government office",
      fullDesc: "There have been allegations of large-scale financial irregularities in a local government office. According to documents submitted by an anonymous informant, a significant portion of funds allocated for projects over the past six months has been spent on non-transparent expenses. Local residents have been protesting against these irregularities for a long time, but no action has been taken.",
      image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "AnonymousUser123",
      date: "4 hours ago",
      likes: 43,
      dislikes: 2,
      tags: ["#corruption", "#government", "#financial_misconduct"]
    },
    {
      id: 2,
      title: "Political Party Members Attempt to Seize Public Property",
      shortDesc: "Local leaders of a political party attempting to occupy government land",
      fullDesc: "Local leaders and supporters of a political party are attempting to illegally occupy government land. When local residents protested against this encroachment, they were threatened. Video footage from an anonymous source shows how party flags are being raised in an attempt to claim the land.",
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      author: "SafeCitizen",
      date: "1 day ago",
      likes: 87,
      dislikes: 5,
      tags: ["#land_grab", "#political_corruption", "#social_injustice"]
    },
    {
      id: 3,
      title: "Use of Substandard Materials in Municipal Work",
      shortDesc: "Evidence of using substandard materials in road construction by local municipality",
      fullDesc: "Substandard materials are being used in road construction and repair work by the local municipality. Information and photos submitted by a contractor's employee show that inferior quality materials are being used compared to the specified standards to make extra profits. These roads are deteriorating within just a few months.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "TruthSeeker",
      date: "2 days ago",
      likes: 121,
      dislikes: 8,
      tags: ["#municipality", "#substandard_work", "#contractor_corruption"]
    },
    {
      id: 4,
      title: "Irregularities in Education Department Appointments",
      shortDesc: "Allegations of corruption in job appointments at local educational institution",
      fullDesc: "There have been allegations of bribery and favoritism in the appointment process at a local educational institution. Qualified candidates are being rejected while unqualified but connected individuals are being appointed. Documents submitted by a complainant show that appointment committee members are taking money in exchange for jobs.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "StudentAdvocate",
      date: "3 days ago",
      likes: 56,
      dislikes: 12,
      tags: ["#education_corruption", "#job_irregularities", "#bribery"]
    },
    {
      id: 5,
      title: "Medicine Theft at Health Center",
      shortDesc: "Evidence of government medicine theft from local health center",
      fullDesc: "Evidence has been found of government medicines being stolen from a local health center and sold to private pharmacies. Video footage secretly recorded by an employee shows how medicine boxes are being loaded into vehicles under cover of darkness. These medicines were provided by the government for free distribution.",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
      author: "HealthWorker",
      date: "5 hours ago",
      likes: 189,
      dislikes: 7,
      tags: ["#healthcare", "#medicine_theft", "#government_resources"]
    },
    {
      id: 6,
      title: "Protest Against River Pollution and Encroachment",
      shortDesc: "River pollution from industrial waste and encroachment by influential people",
      fullDesc: "River water has been severely polluted due to untreated waste from local industries being directly dumped into the river. At the same time, influential individuals are encroaching on river banks to build commercial establishments. Although local environmental activists have protested multiple times, authorities have taken no action.",
      image: "https://images.unsplash.com/photo-1613303341163-bc28b3b2f5d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "EnvironmentProtector",
      date: "6 hours ago",
      likes: 276,
      dislikes: 18,
      tags: ["#river_pollution", "#environment", "#encroachment"]
    }
  ];

  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState({});
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 3;

  // Initialize posts
  useEffect(() => {
    loadMorePosts();
  }, []);

  // Load more posts for endless scroll
  const loadMorePosts = () => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const newPosts = allPostsData.slice(startIndex, endIndex);
    
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
  };

  // Handle scroll event for endless scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          >= document.documentElement.offsetHeight - 100) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  const toggleSavePost = (postId) => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleShare = (post) => {
    navigator.clipboard.writeText(window.location.href);
    alert(`"${post.title}" link copied to clipboard!`);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className=" mx-auto">
        {/* Description and Search */}
        <div className="bg-indigo-100 p-6 rounded-2xl mb-8 shadow-sm">
          <p className="text-indigo-800 text-center mb-4 text-lg font-medium">
            A safe platform for anonymous civic issue reporting
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-2/3">
              <input 
                type="search" 
                placeholder="Search reports..." 
                className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            </div>
            
            <Link 
              to="/create-post"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-medium"
            >
              <FaPlus /> Report Issue
            </Link>
          </div>
        </div>
        
        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                    <FaUserSecret />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">{post.author}</h3>
                    <p className="text-gray-500 text-sm">{post.date}</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
                  <FaEllipsisH />
                </button>
              </div>

              {/* Post Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-72 object-cover"
              />

              {/* Post Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.shortDesc}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1.5 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-4 flex items-center justify-between border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors">
                    <FaThumbsUp /> <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
                    <FaThumbsDown /> <span className="text-sm font-medium">{post.dislikes}</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <Link 
                    to={`/postdetails/${post.id}`}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Read More
                  </Link>
                  
                  <button
                    onClick={() => handleShare(post)}
                    className="text-gray-600 hover:text-green-600 transition-colors p-2 rounded-full hover:bg-gray-200"
                    title="Share this report"
                  >
                    <FiShare2 size={18} />
                  </button>
                  
                  <button
                    onClick={() => toggleSavePost(post.id)}
                    className={`p-2 rounded-full transition-colors ${savedPosts[post.id] ? "text-amber-500 hover:bg-amber-100" : "text-gray-600 hover:text-amber-500 hover:bg-gray-200"}`}
                    title="Save this report"
                  >
                    {savedPosts[post.id] ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length < allPostsData.length && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="text-gray-600 mt-2">Loading more reports...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPost;