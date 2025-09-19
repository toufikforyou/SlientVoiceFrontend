import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaBookmark, FaRegBookmark, FaEllipsisH, FaUserSecret } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router';

const AllPost = () => {
  // Fake data matching SilentVoices theme with Bangla news
  const allPostsData = [
    {
      id: 1,
      title: "স্থানীয় সরকারী অফিসে দুর্নীতির অভিযোগ",
      shortDesc: "একটি স্থানীয় সরকারী অফিসে অর্থ অনিয়মের অভিযোগ উঠেছে",
      fullDesc: "একটি স্থানীয় সরকারী অফিসে বড় অঙ্কের অর্থ অনিয়মের অভিযোগ উঠেছে। অনামী এক সংবাদদাতার পাঠানো তথ্য ও দলিল অনুযায়ী, গত ছয় মাসে প্রকল্প বাবদ বরাদ্দকৃত অর্থের একটি বড় অংশ অস্বচ্ছ খাতে ব্যয় করা হয়েছে। স্থানীয় বাসিন্দারা দীর্ঘদিন ধরে এই অনিয়মের প্রতিবাদ করে আসছিলেন কিন্তু কোনো ব্যবস্থা নেওয়া হয়নি।",
      image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "AnonymousUser123",
      date: "৪ ঘন্টা আগে",
      likes: 43,
      dislikes: 2,
      tags: ["#দুর্নীতি", "#সরকারী_অফিস", "#অর্থ_অনিয়ম"]
    },
    {
      id: 2,
      title: "রাজনৈতিক দলের সদস্যরা জনগণের সম্পত্তি দখলের চেষ্টা",
      shortDesc: "একটি রাজনৈতিক দলের স্থানীয় নেতারা সরকারি জমি দখলের চেষ্টা করছেন",
      fullDesc: "একটি রাজনৈতিক দলের স্থানীয় নেতারা ও সমর্থকরা সরকারি জমি অবৈধভাবে দখলের চেষ্টা করছেন। স্থানীয় বাসিন্দারা এই দখলদারিত্বের বিরুদ্ধে প্রতিবাদ জানালে তাদের উপর হুমকি দেওয়া হয়েছে। অনামী সূত্রের পাঠানো ভিডিওতে দেখা যাচ্ছে কিভাবে দলীয় পতাকা ওঠিয়ে জমি দখলের চেষ্টা করা হচ্ছে।",
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      author: "নিরাপদনাগরিক",
      date: "১ দিন আগে",
      likes: 87,
      dislikes: 5,
      tags: ["#জমি_দখল", "#রাজনৈতিক_দুর্নীতি", "#সামাজিক_অন্যায়"]
    },
    {
      id: 3,
      title: "পৌরসভার কাজে মানহীন উপকরণ ব্যবহার",
      shortDesc: "স্থানীয় পৌরসভার রাস্তা নির্মাণে মানহীন উপকরণ ব্যবহারের প্রমাণ",
      fullDesc: "স্থানীয় পৌরসভার রাস্তা নির্মাণ ও মেরামতের কাজে মানহীন উপকরণ ব্যবহার করা হচ্ছে। একজন ঠিকাদারির কর্মীর পাঠানো তথ্য ও ছবিতে দেখা গেছে, নির্ধারিত মানের চেয়ে নিম্নমানের উপকরণ ব্যবহার করে অতিরিক্ত মুনাফা লুট করা হচ্ছে। এই রাস্তাগুলো মাত্র কয়েক মাসের মধ্যেই ক্ষয়ে যাচ্ছে।",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "সত্যান্বেষী",
      date: "২ দিন আগে",
      likes: 121,
      dislikes: 8,
      tags: ["#পৌরসভা", "#মানহীন_কাজ", "#ঠিকাদারি_দুর্নীতি"]
    },
    {
      id: 4,
      title: "শিক্ষা বিভাগে চাকরির ক্ষেত্রে অনিয়ম",
      shortDesc: "স্থানীয় শিক্ষা প্রতিষ্ঠানে চাকরির ক্ষেত্রে দুর্নীতির অভিযোগ",
      fullDesc: "স্থানীয় একটি শিক্ষা প্রতিষ্ঠানে চাকরির নিয়োগ প্রক্রিয়ায় ঘুষ ও স্বজনপ্রীতির অভিযোগ উঠেছে। যোগ্য প্রার্থীদের বাদ দিয়ে অযোগ্য但有连接的人দের নিয়োগ দেওয়া হচ্ছে। একজন অভিযোগকারীর পাঠানো দলিলে দেখা গেছে, নিয়োগ কমিটির সদস্যরা অর্থের বিনিময়ে নিয়োগ দিচ্ছেন।",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "শিক্ষার্থী",
      date: "৩ দিন আগে",
      likes: 56,
      dislikes: 12,
      tags: ["#শিক্ষা_দুর্নীতি", "#চাকরির_অনিয়ম", "#ঘুষ"]
    },
    {
      id: 5,
      title: "স্বাস্থ্য কেন্দ্রে ওষুধ চুরির ঘটনা",
      shortDesc: "স্থানীয় স্বাস্থ্য কেন্দ্র থেকে সরকারি ওষুধ চুরির প্রমাণ",
      fullDesc: "স্থানীয় একটি স্বাস্থ্য কেন্দ্র থেকে সরকারি ওষুধ চুরি করে বেসরকারি ফার্মেসিতে বিক্রির প্রমাণ মিলেছে। একজন কর্মীর গোপনে তোলা ভিডিওতে দেখা গেছে কিভাবে রাতের অন্ধকারে ওষুধ বাক্সগুলো গাড়িতে তোলা হচ্ছে। এই ওষুধগুলো বিনামূল্যে বিতরণের জন্য সরকার কর্তৃক প্রদত্ত ছিল।",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
      author: "স্বাস্থ্যকর্মী",
      date: "৫ ঘন্টা আগে",
      likes: 189,
      dislikes: 7,
      tags: ["#স্বাস্থ্য", "#ওষুধ_চুরি", "#সরকারি_সম্পদ"]
    },
    {
      id: 6,
      title: "নদী দূষণ ও দখলের বিরুদ্ধে প্রতিবাদ",
      shortDesc: "শিল্পকারখানার বর্জ্যে নদী দূষণ এবং প্রভাবশালী দ্বারা নদী দখল",
      fullDesc: "এলাকার শিল্পকারখানার untreated বর্জ্য সরাসরি নদীতে ফেলার কারণে নদীর পানি মারাত্মকভাবে দূষিত হয়েছে।同时,一些প্রভাবশালী ব্যক্তি নদীর পাড় দখল করে বাণিজ্যিক স্থাপনা গড়ে তুলছেন। স্থানীয় পরিবেশ কর্মীরা多次প্রতিবাদ জানালেও কর্তৃপক্ষ কোনো ব্যবস্থা নিচ্ছেন না।",
      image: "https://images.unsplash.com/photo-1613303341163-bc28b3b2f5d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "পরিবেশপ্রেমী",
      date: "৬ ঘন্টা আগে",
      likes: 276,
      dislikes: 18,
      tags: ["#নদী_দূষণ", "#পরিবেশ", "#নদী_দখল"]
    }
  ];

  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState({});
  const [page, setPage] = useState(1);
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
    alert(`"${post.title}" লিংক কপি করা হয়েছে!`);
  };

  return (
    <div className="min-h-screen bg-blue-400 py-8 px-4">
      <div className=" mx-auto">
        <p className='bg-blue-400 p-4 rounded-2xl'>নিরাপদ ও নিরonymously civic সমস্যা রিপোর্ট করার প্ল্যাটফর্ম</p>
                    <input type="search" name="" id="" />
    
        
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    <FaUserSecret />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">{post.author}</h3>
                    <p className="text-gray-500 text-sm">{post.date}</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <FaEllipsisH />
                </button>
              </div>

              {/* Post Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />

              {/* Post Content */}
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.shortDesc}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100 bg-gray-50">
                <Link to="/postdetails" /><div>
                  read more 
                </div>
                <Link/>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleShare(post)}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                    title="শেয়ার করুন"
                  >
                    <FiShare2 size={18} />
                  </button>
                  
                  <button
                    onClick={() => toggleSavePost(post.id)}
                    className={`transition-colors ${savedPosts[post.id] ? "text-amber-500" : "text-gray-600 hover:text-amber-500"}`}
                    title="সেভ করুন"
                  >
                    {savedPosts[post.id] ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length < allPostsData.length && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="text-gray-600 mt-2">আরো পোস্ট লোড করা হচ্ছে...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPost;