export const demoUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    username: "sarah_j",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    username: "mike_chen",
    verified: false
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    username: "emma_rod",
    verified: true
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    username: "david_w",
    verified: false
  },
  {
    id: 5,
    name: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    username: "lisa_park",
    verified: true
  }
]

export const demoPosts = [
  {
    id: 1,
    userId: 1,
    content: "Just had an amazing coffee at the new local cafe! The atmosphere is perfect for remote work. ☕️ #CoffeeLovers #RemoteWork",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop",
    timestamp: "2025-09-19T10:30:00Z",
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false
  },
  {
    id: 2,
    userId: 2,
    content: "Excited to announce that I've completed my React certification! Ready to build amazing user experiences 🚀",
    image: null,
    timestamp: "2025-09-19T08:15:00Z",
    likes: 45,
    comments: 12,
    shares: 6,
    isLiked: true
  },
  {
    id: 3,
    userId: 3,
    content: "Beautiful sunset from my evening run. Nature never fails to amaze me! 🌅 Taking time to appreciate the small moments.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    timestamp: "2025-09-18T19:45:00Z",
    likes: 67,
    comments: 15,
    shares: 9,
    isLiked: false
  },
  {
    id: 4,
    userId: 4,
    content: "Working on a new web development project. The modern tech stack is incredible - React, Node.js, and MongoDB make development so smooth! 💻",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    timestamp: "2025-09-18T14:20:00Z",
    likes: 33,
    comments: 7,
    shares: 4,
    isLiked: true
  },
  {
    id: 5,
    userId: 5,
    content: "Great team meeting today! Collaboration and communication are key to successful projects. Grateful to work with such talented people! 🤝",
    image: null,
    timestamp: "2025-09-18T11:00:00Z",
    likes: 28,
    comments: 5,
    shares: 2,
    isLiked: false
  },
  {
    id: 6,
    userId: 1,
    content: "Exploring the city's art district. So much creativity and inspiration everywhere! Art has the power to bring communities together. 🎨",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
    timestamp: "2025-09-17T16:30:00Z",
    likes: 52,
    comments: 11,
    shares: 7,
    isLiked: true
  }
]

export const demoComments = [
  {
    id: 1,
    postId: 1,
    userId: 2,
    content: "Which cafe is this? I'm always looking for new places to work from!",
    timestamp: "2025-09-19T10:45:00Z",
    likes: 3
  },
  {
    id: 2,
    postId: 1,
    userId: 3,
    content: "Love the aesthetic! Great photo 📸",
    timestamp: "2025-09-19T11:00:00Z",
    likes: 1
  },
  {
    id: 3,
    postId: 2,
    userId: 5,
    content: "Congratulations! React is such a powerful framework.",
    timestamp: "2025-09-19T08:30:00Z",
    likes: 5
  },
  {
    id: 4,
    postId: 3,
    userId: 4,
    content: "Absolutely stunning! Where is this?",
    timestamp: "2025-09-18T20:00:00Z",
    likes: 2
  }
]