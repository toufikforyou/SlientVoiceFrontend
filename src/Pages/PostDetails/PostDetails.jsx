import { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaPaperPlane, FaEllipsisH, FaBookmark, FaRegBookmark, FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link } from "react-router";

export default function PostDetails() {
  // All data in one const object
  const postData = {
    title: "Corruption Allegations in Local Government Office",
    description: "There have been allegations of large-scale financial irregularities in a local government office. According to documents submitted by an anonymous informant, a significant portion of funds allocated for projects over the past six months has been spent on non-transparent expenses. Local residents have been protesting against these irregularities for a long time, but no action has been taken.",
    image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    author: "AnonymousUser123",
    date: "4 hours ago",
    tags: ["#corruption", "#government", "#financial_misconduct"],
    initialLikes: 43,
    initialDislikes: 2,
    initialComments: [
      { id: 1, user: "TruthSeeker", text: "This has been going on for too long! We need immediate action.", time: "2 hours ago", likes: 5 },
      { id: 2, user: "ConcernedCitizen", text: "I've personally witnessed these irregularities. More people need to speak up!", time: "1 hour ago", likes: 3 },
      { id: 3, user: "JusticeForAll", text: "This is why we need platforms like SilentVoices to expose corruption.", time: "45 minutes ago", likes: 8 }
    ]
  };

  const [likes, setLikes] = useState(postData.initialLikes);
  const [dislikes, setDislikes] = useState(postData.initialDislikes);
  const [comments, setComments] = useState(postData.initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post link copied to clipboard!");
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newCommentObj = {
      id: comments.length + 1,
      user: "AnonymousUser",
      text: newComment,
      time: "Just now",
      likes: 0
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikes(dislikes - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(dislikes - 1);
      setIsDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }
  };

  const handleCommentLike = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 } 
        : comment
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link to="/">
        <button className="flex items-center text-indigo-600 mb-6 font-medium cursor-pointer">
          <RiArrowLeftLine className="mr-2" /> Back to Feed
        </button>
        </Link>

        {/* Post C ard */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Post Header */}
          <div className="p-5 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                <span className="font-medium">{postData.author.charAt(0)}</span>
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-gray-900">{postData.author}</h3>
                <p className="text-gray-500 text-sm">{postData.date}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FaEllipsisH />
            </button>
          </div>

          {/* Post Image */}
          <img
            src={postData.image}
            alt="Government office building"
            className="w-full h-72 object-cover"
          />

          {/* Post Content */}
          <div className="p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{postData.title}</h2>
            <p className="text-gray-700 leading-relaxed">
              {postData.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {postData.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Reactions */}
          <div className="px-5 py-4 flex items-center justify-between border-t border-gray-100">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 transition-colors ${isLiked ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"}`}
              >
                {isLiked ? <FaThumbsUp /> : <FaThumbsUp />} 
                <span className="text-sm font-medium">{likes}</span>
              </button>

              <button
                onClick={handleDislike}
                className={`flex items-center gap-2 transition-colors ${isDisliked ? "text-red-600" : "text-gray-500 hover:text-red-600"}`}
              >
                {isDisliked ? <FaThumbsDown /> : <FaThumbsDown />} 
                <span className="text-sm font-medium">{dislikes}</span>
              </button>
              
              <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors">
                <FaRegComment /> <span className="text-sm font-medium">{comments.length}</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="text-gray-500 hover:text-green-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                title="Share this post"
              >
                <FiShare2 size={18} />
              </button>
              
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full transition-colors ${isSaved ? "text-amber-500 hover:bg-amber-100" : "text-gray-500 hover:text-amber-500 hover:bg-gray-100"}`}
                title="Save this post"
              >
                {isSaved ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
              </button>
            </div>
          </div>

          {/* Comment Input */}
          <div className="px-5 py-4 flex items-center gap-3 border-t border-gray-100">
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a comment anonymously..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
              />
            </div>
            <button
              onClick={handleAddComment}
              disabled={newComment.trim() === ""}
              className="p-3 bg-indigo-600 text-white rounded-xl flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:bg-indigo-700"
              title="Post comment"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>

          {/* Comments List */}
          <div className="border-t border-gray-100">
            <div className="px-5 py-4">
              <h3 className="font-semibold text-gray-900 mb-4">Comments ({comments.length})</h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">
                      {comment.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm text-gray-900">{comment.user}</h4>
                          <span className="text-xs text-gray-400">{comment.time}</span>
                        </div>
                        <p className="text-gray-800 text-sm">{comment.text}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 ml-2">
                        <button 
                          onClick={() => handleCommentLike(comment.id)}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600"
                        >
                          <FaRegHeart size={12} /> <span>{comment.likes}</span>
                        </button>
                        <button className="text-xs text-gray-500 hover:text-indigo-600">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}