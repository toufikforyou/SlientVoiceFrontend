import { useState, useRef, useEffect } from 'react'
import { FaImage, FaSmile, FaTimes, FaUpload } from 'react-icons/fa'
import { uploadMultipleImages } from '../api/imageBBAPI'
import { sessionManager } from '../utils/sessionManager'
import { useAuth } from '../contexts/AuthContext'
import UserAvatar from './UserAvatar'
import { getUserDisplayName } from '../utils/userAvatar'

const PostForm = ({ onSubmit }) => {
  const { user, isAuthenticated } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)



  // Load draft post on component mount
  useEffect(() => {
    const draft = sessionManager.getDraftPost()
    if (draft) {
      setTitle(draft.title || '')
      setContent(draft.content || '')
      setImage(draft.image || '')
      setUploadedImages(draft.uploadedImages || [])
      if (draft.title || draft.content || draft.image) {
        setIsExpanded(true)
      }
    }
  }, [])

  // Save draft whenever content changes
  useEffect(() => {
    if (title || content || image || uploadedImages.length > 0) {
      sessionManager.saveDraftPost({
        title,
        content,
        image,
        uploadedImages
      })
    }
  }, [title, content, image, uploadedImages])

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setSelectedFiles(files)
    setIsUploading(true)

    try {
      const uploadResult = await uploadMultipleImages(files)
      
      if (uploadResult.success) {
        setUploadedImages(uploadResult.data.urls)
        console.log('Images uploaded successfully:', uploadResult.data.urls)
      } else {
        console.error('Image upload failed:', uploadResult.error)
      }
    } catch (error) {
      console.error('Error uploading images:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const removeUploadedImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (content.trim()) {
      setIsSubmitting(true)
      try {
        const imagesToSubmit = [...uploadedImages]
        if (image.trim()) {
          imagesToSubmit.push(image.trim())
        }

        await onSubmit({
          title: title.trim() || 'Untitled Post',
          content: content.trim(),
          images: imagesToSubmit,
          userId: 1 // Default user
        })
        
        // Reset form and clear draft
        setTitle('')
        setContent('')
        setImage('')
        setSelectedFiles([])
        setUploadedImages([])
        setIsExpanded(false)
        sessionManager.clearDraftPost()
      } catch (error) {
        console.error('Error submitting post:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          {/* User Avatar */}
          <UserAvatar user={user} size="w-10 h-10" showTooltip={true} />
          <div className="flex-1">
            {isExpanded && (
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title (optional)"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            )}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder={user ? `What's on your mind, ${getUserDisplayName(user)}?` : "What's on your mind?"}
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              rows={isExpanded ? 4 : 2}
            />
            
            {isExpanded && (
              <div className="mt-3 space-y-3">
                {/* Image URL Input */}
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Add an image URL (optional)"
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                
                {/* File Upload */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">or</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <FaUpload className={isUploading ? 'animate-spin' : ''} />
                    <span>{isUploading ? 'Uploading...' : 'Upload Images'}</span>
                  </button>
                </div>

                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {uploadedImages.map((imageUrl, index) => (
                      <div key={index} className="relative">
                        <img
                          src={imageUrl}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeUploadedImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-gray-500">
              <button
                type="button"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaImage className="text-green-500" />
                <span className="text-sm">Photo</span>
              </button>
              <button
                type="button"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaSmile className="text-yellow-500" />
                <span className="text-sm">Feeling</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => {
                  setTitle('')
                  setContent('')
                  setImage('')
                  setSelectedFiles([])
                  setUploadedImages([])
                  setIsExpanded(false)
                  sessionManager.clearDraftPost()
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </>
                ) : (
                  <span>Post</span>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default PostForm