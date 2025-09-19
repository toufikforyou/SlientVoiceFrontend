import { useState, useEffect } from 'react'
import { postAPI } from '../api/postAPI'

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await postAPI.getAllPosts()
        
        if (result.success) {
          setPosts(result.data)
        } else {
          setError(result.error)
          setPosts([])
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Failed to connect to the server')
        setPosts([])
      }
      
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const addPost = async (newPost) => {
    try {
      setLoading(true)
      const result = await postAPI.createPost({
        title: newPost.title || 'Untitled Post',
        content: newPost.content,
        images: newPost.images || (newPost.image ? [newPost.image] : [])
      })

      if (result.success) {
        setPosts(prev => [result.data, ...prev])
        return { success: true }
      } else {
        setError('Failed to create post')
        return { success: false, error: result.error }
      }
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Failed to create post')
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const likePost = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ))
  }

  const deletePost = async (postId) => {
    try {
      const result = await postAPI.deletePost(postId)
      
      if (result.success) {
        setPosts(prev => prev.filter(post => post.id !== postId))
        return { success: true }
      } else {
        setError('Failed to delete post')
        return { success: false, error: result.error }
      }
    } catch (err) {
      console.error('Error deleting post:', err)
      setError('Failed to delete post')
      return { success: false, error: err.message }
    }
  }

  const refreshPosts = async () => {
    const result = await postAPI.getAllPosts()
    if (result.success) {
      setPosts(result.data)
    }
  }

  return {
    posts,
    loading,
    error,
    addPost,
    likePost,
    deletePost,
    refreshPosts
  }
}

export const useTimeAgo = (timestamp) => {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date()
      const postTime = new Date(timestamp)
      const diffInMs = now - postTime
      const diffInMinutes = Math.floor(diffInMs / 60000)
      const diffInHours = Math.floor(diffInMinutes / 60)
      const diffInDays = Math.floor(diffInHours / 24)

      if (diffInMinutes < 1) {
        setTimeAgo('Just now')
      } else if (diffInMinutes < 60) {
        setTimeAgo(`${diffInMinutes}m`)
      } else if (diffInHours < 24) {
        setTimeAgo(`${diffInHours}h`)
      } else if (diffInDays < 7) {
        setTimeAgo(`${diffInDays}d`)
      } else {
        setTimeAgo(postTime.toLocaleDateString())
      }
    }

    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [timestamp])

  return timeAgo
}