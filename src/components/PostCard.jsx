import { useState } from 'react'
import { FaHeart, FaComment, FaShare, FaEllipsisH, FaCheckCircle } from 'react-icons/fa'
import { useTimeAgo } from '../hooks/usePosts'
import UserAvatar from './UserAvatar'
import { getUserDisplayName } from '../utils/userAvatar'

const PostCard = ({ post, onLike, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false)
  const timeAgo = useTimeAgo(post.timestamp)

  const handleLike = () => {
    onLike(post.id)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserAvatar user={post.user} size="w-12 h-12" showTooltip={true} />
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-gray-900">{getUserDisplayName(post.user)}</h3>
                {post.user?.verified && (
                  <FaCheckCircle className="text-blue-500 text-sm" />
                )}
              </div>
              <p className="text-gray-500 text-sm">@{post.user?.username} • {timeAgo}</p>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaEllipsisH className="text-gray-400" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Copy link
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    handleDelete()
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Delete post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        {post.title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {post.title}
          </h3>
        )}
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-6 pb-4">
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-lg object-cover max-h-96"
          />
        </div>
      )}

      {/* Post Stats */}
      <div className="px-6 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{post.likes} likes</span>
          <div className="flex items-center space-x-4">
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-around">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              post.isLiked 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaHeart className={`${post.isLiked ? 'text-red-500' : 'text-gray-500'}`} />
            <span className="font-medium">Like</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <FaComment className="text-gray-500" />
            <span className="font-medium">Comment</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <FaShare className="text-gray-500" />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard