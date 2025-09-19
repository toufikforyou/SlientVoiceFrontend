import { useState } from 'react';
import { FaCamera, FaTimes, FaPaperPlane, FaUserSecret, FaLock } from 'react-icons/fa';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Link } from 'react-router';

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: null,
    tags: [],
    currentTag: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPostData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  const handleTagAdd = () => {
    if (postData.currentTag.trim() && !postData.tags.includes(postData.currentTag)) {
      setPostData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the post submission
    console.log('Submitting post:', postData);
    alert('Your anonymous report has been submitted successfully!');
    // Reset form
    setPostData({
      title: '',
      description: '',
      image: null,
      imagePreview: null,
      tags: [],
      currentTag: ''
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.name === 'currentTag') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
         <Link to="/"> <button className="flex items-center text-indigo-600 mr-4">
            <RiArrowLeftLine className="text-lg" />
          </button></Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Anonymous Report</h1>
            <p className="text-gray-600">Share your concern while maintaining complete privacy</p>
          </div>
        </div>

        {/* Privacy Assurance */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <div className="bg-indigo-100 p-2 rounded-full mr-3">
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
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
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
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Evidence (Optional)
            </label>
            {postData.imagePreview ? (
              <div className="relative">
                <img
                  src={postData.imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaCamera className="text-gray-400 text-2xl mb-2" />
                  <p className="text-sm text-gray-500">Click to upload an image</p>
                  <p className="text-xs text-gray-400 mt-1">(Metadata will be automatically removed)</p>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Tags Input */}
          <div className="mb-8">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags (Optional)
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
            <div className="flex flex-wrap gap-2">
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
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            Submit Anonymously
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