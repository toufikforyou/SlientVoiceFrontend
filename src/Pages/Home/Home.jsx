import React from "react";
import { Link } from "react-router"; // corrected router import

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Fake posts (20+)
  const posts = [
    {
      id: 1,
      title: "Whispers of the Forgotten City",
      content:
        "Legends speak of a hidden city beneath the sands, where time stands still and echoes of the past whisper through the ruins.",
      author: "Aiden Cross",
      date: "2025-09-01",
      image: "https://picsum.photos/seed/post1/600/300",
    },
    {
      id: 2,
      title: "Starlight Over the Horizon",
      content:
        "When the night sky comes alive, every star becomes a story waiting to be told, a dream waiting to be lived.",
      author: "Luna Sterling",
      date: "2025-09-02",
      image: "https://picsum.photos/seed/post2/600/300",
    },
    {
      id: 3,
      title: "The Silent Watcher",
      content:
        "Amid the chaos of the world, a silent guardian observes, waiting for the right moment to step forward.",
      author: "Kai Mercer",
      date: "2025-09-03",
      image: "https://picsum.photos/seed/post3/600/300",
    },
    {
      id: 4,
      title: "Echoes in the Wind",
      content:
        "Every breeze carries with it a story — of joy, of sorrow, of battles won and dreams lost.",
      author: "Seraphine Vale",
      date: "2025-09-04",
      image: "https://picsum.photos/seed/post4/600/300",
    },
    {
      id: 5,
      title: "Beyond the Edge",
      content:
        "True courage begins where comfort ends — beyond the edge of the known lies greatness.",
      author: "Dorian Hale",
      date: "2025-09-05",
      image: "https://picsum.photos/seed/post5/600/300",
    },
    {
      id: 6,
      title: "Ashes of Tomorrow",
      content:
        "From the ashes of destruction, hope always finds a way to rise again.",
      author: "Nova Elric",
      date: "2025-09-06",
      image: "https://picsum.photos/seed/post6/600/300",
    },
    {
      id: 7,
      title: "The Clockmaker’s Secret",
      content:
        "Every tick hides a story, every tock conceals a truth — the clockmaker knew more than time itself.",
      author: "Ezra Thorn",
      date: "2025-09-07",
      image: "https://picsum.photos/seed/post7/600/300",
    },
    {
      id: 8,
      title: "Wings of Fireflies",
      content:
        "In the darkness, even the smallest light can become a guide for the lost.",
      author: "Aurora Quinn",
      date: "2025-09-08",
      image: "https://picsum.photos/seed/post8/600/300",
    },
    {
      id: 9,
      title: "Shadows Beneath the Moon",
      content:
        "Not all shadows are born from darkness — some protect the light in silence.",
      author: "Rowan Black",
      date: "2025-09-09",
      image: "https://picsum.photos/seed/post9/600/300",
    },
    {
      id: 10,
      title: "The Painter of Dreams",
      content:
        "With every stroke of color, she painted not what she saw, but what she believed the world could become.",
      author: "Celeste Dune",
      date: "2025-09-10",
      image: "https://picsum.photos/seed/post10/600/300",
    },
    // ... you can duplicate/extend up to 20–30 like this
  ];

  return (
    <div className=" mx-auto p-4">

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{post.date}</p>
              <p className="text-gray-700 mt-3 line-clamp-3">{post.content}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">By {post.author}</span>
                <Link
                  to={`/post/${post.id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
