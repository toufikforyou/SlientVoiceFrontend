import { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaPaperPlane, FaEllipsisH, FaBookmark, FaRegBookmark, FaRegComment } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

export default function PostDetails() {
  // All data in one const object
  const postData = {
    title: "Revolutionary Flying Car Approved for Public Use Starting Next Month",
    description: "In a groundbreaking announcement, the Federal Aviation Administration has approved the first-ever flying car for public use. The AeroMobil 5.0, which transforms from car to aircraft in under 60 seconds, will be available to consumers starting next month. The vehicle requires a special pilot's license but can be driven like a regular car on roads. With a top speed of 300 mph in air and 120 mph on land, it's set to revolutionize personal transportation.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    author: "News Today",
    date: "4 hours ago",
    tags: ["#breaking", "#innovation", "#technology"],
    initialLikes: 243,
    initialDislikes: 12,
    initialComments: [
      { id: 1, user: "Sarah Johnson", text: "This is absolutely unbelievable! I knew it all along!", time: "2 hours ago" },
      { id: 2, user: "Mark Thompson", text: "Fake news! Don't believe everything you read online.", time: "1 hour ago" },
      { id: 3, user: "Emily Chen", text: "This changes everything! We need to spread awareness about this.", time: "45 minutes ago" }
    ]
  };

  const [likes, setLikes] = useState(postData.initialLikes);
  const [dislikes, setDislikes] = useState(postData.initialDislikes);
  const [comments, setComments] = useState(postData.initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post link copied to clipboard!");
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newCommentObj = {
      id: comments.length + 1,
      user: "You",
      text: newComment,
      time: "Just now"
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-8 font-sans">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {postData.author.charAt(0)}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold">{postData.author}</h3>
            <p className="text-gray-500 text-sm">{postData.date}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <FaEllipsisH />
        </button>
      </div>

      {/* Post Image */}
      <img
        src={postData.image}
        alt="Flying car prototype"
        className="w-full h-auto object-cover"
      />

      {/* Post Content */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-900">{postData.title}</h2>
        <p className="text-gray-700 mt-2">
          {postData.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {postData.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Reactions */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLikes(likes + 1)}
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaThumbsUp /> <span className="text-sm">{likes}</span>
          </button>

          <button
            onClick={() => setDislikes(dislikes + 1)}
            className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaThumbsDown /> <span className="text-sm">{dislikes}</span>
          </button>
          
          <button className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors">
            <FaRegComment /> <span className="text-sm">{comments.length}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            <FiShare2 size={18} />
          </button>
          
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`transition-colors ${isSaved ? "text-amber-500" : "text-gray-600 hover:text-amber-500"}`}
          >
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>

      {/* Comment Input */}
      <div className="p-4 flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write a comment..."
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleAddComment}
          disabled={newComment.trim() === ""}
          className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <FaPaperPlane size={16} />
        </button>
      </div>

      {/* Comments List */}
      <div className="px-4 pb-4 space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-3 bg-gray-50 rounded-xl"
          >
            <div className="flex items-start">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-white text-xs font-bold">
                {comment.user.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{comment.user}</h4>
                  <span className="text-xs text-gray-400">{comment.time}</span>
                </div>
                <p className="text-gray-800 mt-1">{comment.text}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button className="text-xs text-gray-500 hover:text-blue-600">Like</button>
                  <button className="text-xs text-gray-500 hover:text-blue-600">Reply</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}