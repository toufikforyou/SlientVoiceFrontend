import axiosPublic from './axiosPublic'

// API endpoints
const ENDPOINTS = {
  POSTS: '/post',
}

// Transform API response to match our component structure
const transformPost = (apiPost) => {
  return {
    id: apiPost._id,
    content: apiPost.desc,
    title: apiPost.title,
    image: apiPost.images && apiPost.images.length > 0 ? apiPost.images[0] : null,
    images: apiPost.images || [],
    timestamp: apiPost.createdAt,
    likes: Math.floor(Math.random() * 100), // Since likes not in API, using random for demo
    comments: Math.floor(Math.random() * 20),
    shares: Math.floor(Math.random() * 10),
    isLiked: false,
    userId: apiPost.uid || apiPost.author,
    user: {
      id: apiPost.uid || apiPost.author || 'anonymous',
      name: apiPost.uid ? `User ${apiPost.uid.slice(0, 8)}` : 'Anonymous User',
      username: apiPost.uid ? apiPost.uid.toLowerCase().slice(0, 10) : 'anonymous',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiPost.uid || apiPost.author || 'anonymous'}`,
      verified: false
    }
  }
}

// API service functions
export const postAPI = {
  // Get all posts
  async getAllPosts() {
    try {
      const response = await axiosPublic.get(ENDPOINTS.POSTS)
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data.map(transformPost)
        }
      } else {
        throw new Error(response.data.message || 'Failed to fetch posts')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch posts'
      }
    }
  },

  // Create a new post
  async createPost(postData) {
    try {
      const requestBody = {
        title: postData.title || 'Untitled Post',
        desc: postData.content || postData.desc,
        images: Array.isArray(postData.images) ? postData.images : (postData.image ? [postData.image] : [])
      }

      console.log('Creating post with data:', requestBody)

      const response = await axiosPublic.post(ENDPOINTS.POSTS, requestBody)

      if (response.data.success) {
        return {
          success: true,
          data: transformPost(response.data.data)
        }
      } else {
        throw new Error(response.data.message || 'Failed to create post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to create post'
      }
    }
  },

  // Update a post (if your API supports it)
  async updatePost(postId, postData) {
    try {
      const response = await axiosPublic.put(`${ENDPOINTS.POSTS}/${postId}`, postData)
      
      if (response.data.success) {
        return {
          success: true,
          data: transformPost(response.data.data)
        }
      } else {
        throw new Error(response.data.message || 'Failed to update post')
      }
    } catch (error) {
      console.error('Error updating post:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to update post'
      }
    }
  },

  // Delete a post (if your API supports it)
  async deletePost(postId) {
    try {
      await axiosPublic.delete(`${ENDPOINTS.POSTS}/${postId}`)
      
      return {
        success: true,
        message: 'Post deleted successfully'
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to delete post'
      }
    }
  }
}

export default postAPI