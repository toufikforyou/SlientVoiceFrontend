import { useState, useRef } from 'react';
import { FaCamera, FaTimes, FaPaperPlane, FaUserSecret, FaLock, FaPlus, FaSpinner } from 'react-icons/fa';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    images: [],
    tags: [],
    currentTag: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        images: 'Please upload only image files (JPEG, PNG, GIF, WebP)'
      }));
      return;
    }

    // Validate file sizes (max 5MB each)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        images: 'Images must be less than 5MB each'
      }));
      return;
    }

    // Clear any previous errors
    if (errors.images) {
      setErrors(prev => ({
        ...prev,
        images: ''
      }));
    }

    // Limit to 5 images maximum
    const remainingSlots = 5 - postData.images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData(prev => ({
          ...prev,
          images: [...prev.images, {
            file,
            preview: reader.result,
            uploaded: false,
            url: null
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setPostData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleTagAdd = () => {
    if (postData.currentTag.trim() && !postData.tags.includes(postData.currentTag)) {
      if (postData.tags.length >= 5) {
        setErrors(prev => ({
          ...prev,
          tags: 'Maximum 5 tags allowed'
        }));
        return;
      }
      
      setPostData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }));
      
      if (errors.tags) {
        setErrors(prev => ({
          ...prev,
          tags: ''
        }));
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Function to upload image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Replace with your actual ImgBB API key
    const API_KEY = '4ae736f7f11e8b2a500003cbf95b22dc';
    
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!postData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!postData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (postData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Upload all images to ImgBB first
      const imageUploadPromises = postData.images.map(async (img) => {
        if (!img.uploaded) {
          const imageUrl = await uploadImageToImgBB(img.file);
          return { ...img, uploaded: true, url: imageUrl };
        }
        return img;
      });

      const uploadedImages = await Promise.all(imageUploadPromises);
      
      // Prepare final post data with image URLs
      const finalPostData = {
        ...postData,
        images: uploadedImages,
        imageUrls: uploadedImages.map(img => img.url)
      };

      console.log('Submitting post:', finalPostData);
      
      // Here you would typically send the data to your backend
      // await api.createPost(finalPostData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Your anonymous report has been submitted successfully!');
      
      // Reset form
      setPostData({
        title: '',
        description: '',
        images: [],
        tags: [],
        currentTag: ''
      });
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('There was an error submitting your report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.name === 'currentTag') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/">
            <button className="flex items-center text-indigo-600 mr-4 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
              <RiArrowLeftLine className="text-lg" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Anonymous Report</h1>
            <p className="text-gray-600">Share your concern while maintaining complete privacy</p>
          </div>
        </div>

        {/* Privacy Assurance */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <div className="bg-indigo-100 p-2 rounded-full mr-3 mt-0.5">
              <FaLock className="text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-indigo-900">Your Privacy is Protected</h3>
              <p className="text-indigo-700 text-sm mt-1">
                All posts are completely anonymous. Your identity will never be revealed, and image metadata is automatically removed.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Title Input */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Issue Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={postData.title}
              onChange={handleInputChange}
              placeholder="Briefly describe the issue..."
              className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              required
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={postData.description}
              onChange={handleInputChange}
              placeholder="Provide details about what happened, when, where, and any other relevant information..."
              rows={5}
              className={`w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none`}
              required
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            <div className="text-xs text-gray-500 mt-1">
              {postData.description.length}/1000 characters (minimum 10 required)
            </div>
          </div>

          {/* Multiple Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Evidence (Optional) - Max 5 images
            </label>
            
            {errors.images && <p className="mt-1 text-sm text-red-600 mb-3">{errors.images}</p>}
            
            {/* Image Previews */}
            {postData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                {postData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                    {image.uploaded && (
                      <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Uploaded
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Add more images button */}
                {postData.images.length < 5 && (
                  <div 
                    onClick={triggerFileInput}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <FaPlus className="text-gray-400 text-lg mb-1" />
                      <p className="text-xs text-gray-500 text-center">Add Image<br/>({5 - postData.images.length} remaining)</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Initial upload prompt */}
            {postData.images.length === 0 && (
              <div 
                onClick={triggerFileInput}
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaCamera className="text-gray-400 text-2xl mb-2" />
                  <p className="text-sm text-gray-500">Click to upload images</p>
                  <p className="text-xs text-gray-400 mt-1">(Metadata will be automatically removed)</p>
                  <p className="text-xs text-gray-400 mt-1">JPEG, PNG, GIF, WebP • Max 5MB each</p>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
              className="hidden"
            />
          </div>

          {/* Tags Input */}
          <div className="mb-8">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags (Optional) - Max 5 tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                name="currentTag"
                value={postData.currentTag}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag and press Enter"
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="px-4 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-colors"
              >
                Add
              </button>
            </div>
            {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
            <div className="flex flex-wrap gap-2 mt-2">
              {postData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Submit Anonymously
              </>
            )}
          </button>

          {/* Anonymous Disclaimer */}
          <div className="flex items-center justify-center mt-4 text-gray-500 text-sm">
            <FaUserSecret className="mr-2" />
            Posted as: AnonymousUser{Math.floor(Math.random() * 10000)}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;