import { FaUsers, FaHeart, FaGlobe, FaLightbulb, FaLock, FaRocket } from 'react-icons/fa'

const About = () => {
  const features = [
    {
      icon: FaUsers,
      title: "Connect & Share",
      description: "Build meaningful connections with people around the world and share your stories."
    },
    {
      icon: FaHeart,
      title: "Safe Community",
      description: "We prioritize creating a safe and inclusive environment for everyone to express themselves."
    },
    {
      icon: FaGlobe,
      title: "Global Reach",
      description: "Connect with people from different cultures and backgrounds, expanding your worldview."
    },
    {
      icon: FaLightbulb,
      title: "Creative Expression",
      description: "Share your ideas, creativity, and passion with a community that values diverse perspectives."
    },
    {
      icon: FaLock,
      title: "Privacy First",
      description: "Your data and privacy are protected with industry-leading security measures."
    },
    {
      icon: FaRocket,
      title: "Innovation",
      description: "We continuously evolve with cutting-edge features to enhance your social experience."
    }
  ]

  const stats = [
    { number: "1M+", label: "Active Users" },
    { number: "10M+", label: "Posts Shared" },
    { number: "150+", label: "Countries" },
    { number: "99.9%", label: "Uptime" }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Passionate about connecting people through technology and creating meaningful online communities."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Tech enthusiast with 10+ years of experience building scalable social platforms."
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Believes in creating beautiful, user-centric designs that make technology accessible to everyone."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Silent Voices
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
              Empowering individuals to share their stories, connect with others, and build meaningful relationships in a safe digital space.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Silent Voices, we believe everyone has a story worth sharing. Our platform is designed to give voice to the unheard, connect like-minded individuals, and foster meaningful conversations that can change the world.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We're committed to creating a space where authenticity thrives, creativity flourishes, and communities grow stronger through shared experiences and mutual support.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaHeart className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Built with Purpose</h3>
                  <p className="text-gray-600">Every feature is designed with our community's well-being in mind.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">1M+ Happy Users</p>
                    <p className="text-sm text-gray-600">And growing every day</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built Silent Voices with features that prioritize your experience, safety, and creativity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind Silent Voices, working to make social connection better for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Be part of a growing community where your voice matters and your connections are meaningful.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  )
}

export default About