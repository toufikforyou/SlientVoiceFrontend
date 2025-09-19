import axios from 'axios'

// ImageBB API configuration
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || 'your-imgbb-api-key'
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload'

/**
 * Upload image to ImageBB
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<Object>} - Upload result with image URL
 */
export const uploadImageToImageBB = async (imageFile) => {
  try {
    // Validate file
    if (!imageFile) {
      throw new Error('No image file provided')
    }

    // Check file size (ImageBB has a limit, usually 32MB)
    const maxSize = 32 * 1024 * 1024 // 32MB in bytes
    if (imageFile.size > maxSize) {
      throw new Error('Image file too large. Maximum size is 32MB.')
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(imageFile.type)) {
      throw new Error('Invalid file type. Please upload JPEG, PNG, GIF, or WebP images.')
    }

    // Create FormData for the upload
    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('key', IMGBB_API_KEY)

    // Upload to ImageBB
    const response = await axios.post(IMGBB_API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        console.log(`Upload progress: ${percentCompleted}%`)
      }
    })

    if (response.data.success) {
      return {
        success: true,
        data: {
          url: response.data.data.url,
          deleteUrl: response.data.data.delete_url,
          displayUrl: response.data.data.display_url,
          thumbUrl: response.data.data.thumb?.url,
          mediumUrl: response.data.data.medium?.url,
        }
      }
    } else {
      throw new Error(response.data.error?.message || 'Failed to upload image')
    }
  } catch (error) {
    console.error('ImageBB upload error:', error)
    
    if (error.response) {
      // Server responded with error
      const errorMessage = error.response.data?.error?.message || 'Upload failed'
      return {
        success: false,
        error: `ImageBB Error: ${errorMessage}`
      }
    } else if (error.request) {
      // Network error
      return {
        success: false,
        error: 'Network error: Could not connect to image upload service'
      }
    } else {
      // Other error
      return {
        success: false,
        error: error.message || 'Failed to upload image'
      }
    }
  }
}

/**
 * Upload multiple images to ImageBB
 * @param {File[]} imageFiles - Array of image files to upload
 * @returns {Promise<Object>} - Upload results with image URLs
 */
export const uploadMultipleImages = async (imageFiles) => {
  try {
    const uploadPromises = imageFiles.map(file => uploadImageToImageBB(file))
    const results = await Promise.all(uploadPromises)
    
    const successful = results.filter(result => result.success)
    const failed = results.filter(result => !result.success)
    
    return {
      success: successful.length > 0,
      data: {
        successful: successful.map(result => result.data),
        failed: failed.map(result => result.error),
        urls: successful.map(result => result.data.url)
      },
      totalUploaded: successful.length,
      totalFailed: failed.length
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to upload multiple images',
      details: error.message
    }
  }
}

export default {
  uploadImageToImageBB,
  uploadMultipleImages
}