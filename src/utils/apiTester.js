import { postAPI } from '../api/postAPI'

// Test API connection utility
export const testAPIConnection = async () => {
  console.log('🔍 Testing API connection...')
  
  try {
    const result = await postAPI.getAllPosts()
    
    if (result.success) {
      console.log('✅ API Connection Success!')
      console.log(`📊 Found ${result.data.length} posts`)
      console.log('📝 Sample post:', result.data[0])
      return { success: true, posts: result.data }
    } else {
      console.log('❌ API Connection Failed:', result.error)
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.log('💥 API Connection Error:', error.message)
    return { success: false, error: error.message }
  }
}

// Test post creation
export const testPostCreation = async () => {
  console.log('🔍 Testing post creation...')
  
  try {
    const testPost = {
      title: 'Test Post from Frontend',
      content: 'This is a test post created from the React frontend to verify API integration.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      author: 'FRONTEND_TEST_USER'
    }
    
    const result = await postAPI.createPost(testPost)
    
    if (result.success) {
      console.log('✅ Post Creation Success!')
      console.log('📝 Created post:', result.data)
      return { success: true, post: result.data }
    } else {
      console.log('❌ Post Creation Failed:', result.error)
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.log('💥 Post Creation Error:', error.message)
    return { success: false, error: error.message }
  }
}

// Export for console testing
if (typeof window !== 'undefined') {
  window.testAPI = {
    testConnection: testAPIConnection,
    testPostCreation: testPostCreation
  }
}