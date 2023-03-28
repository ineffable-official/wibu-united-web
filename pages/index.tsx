import { useState } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "One piece Episode 255",
      anime_name: "One Piece",
      watched: 125523,
      date: new Date(),
    },
    {
      id: 2,
      title: "One piece Episode 256",
      anime_name: "One Piece",
      watched: 432564,
      date: new Date(),
    },
    {
      id: 3,
      title: "One piece Episode 257",
      anime_name: "One Piece",
      watched: 63234,
      date: new Date(),
    },
    {
      id: 4,
      title: "One piece Episode 258",
      anime_name: "One Piece",
      watched: 64562,
      date: new Date(),
    },
    {
      id: 5,
      title: "One piece Episode 259",
      anime_name: "One Piece",
      watched: 534623,
      date: new Date(),
    },
  ]);
  return (
    <div className="w-full h-screen overflow-hidden">
      <Navbar />
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="w-full h-full p-8 flex flex-wrap gap-4 overflow-y-scroll">
          {posts
            ? posts.map((post, index) => <PostCard post={post} key={post.id} />)
            : ""}
        </div>
      </div>
    </div>
  );
}
