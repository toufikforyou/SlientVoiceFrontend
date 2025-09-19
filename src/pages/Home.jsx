import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import ErrorAlert from '../components/ErrorAlert'
import { FaSpinner, FaUsers, FaArrowUp, FaNewspaper, FaSync } from 'react-icons/fa'

const Home = () => {
  const [showError, setShowError] = useState(true)
  const { posts, loading, error, addPost, likePost, deletePost } = usePosts()

  const stats = [
    { icon: FaUsers, label: 'Active Users', value: '1.2k', color: 'text-blue-500' },
    { icon: FaArrowUp, label: 'Posts Today', value: '156', color: 'text-green-500' },
    { icon: FaNewspaper, label: 'Total Posts', value: '8.9k', color: 'text-purple-500' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mx-auto mb-4" />
          <p className="text-gray-600">Loading your feed...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                        <Icon className="text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="font-semibold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome to Silent Voices</h2>
              <p className="opacity-90">Connect with your community and share your thoughts with the world.</p>
            </div>

            {/* Error Alert */}
            {error && showError && (
              <ErrorAlert 
                message={error}
                type="warning"
                onClose={() => setShowError(false)}
              />
            )}

            {/* Post Creation Form */}
            <PostForm onSubmit={addPost} />

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <FaNewspaper className="text-gray-300 text-4xl mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-500">Be the first to share something with the community!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={likePost}
                    onDelete={deletePost}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar - Suggestions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Anonimus_234</span> liked your post
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Anonimus_235</span> commented on your photo
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Anonimus_250</span> shared your post
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home