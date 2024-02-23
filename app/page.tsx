"use cliet";

import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { NextPage } from "next";
import PostCard from "./components/PostCard";

const Home: NextPage = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="bg-red-100 min-h-screen flex flex-col items-center">
      <h1 className="my-20 text-2xl font-bold">NextJS Blog</h1>
      <ul className="flex flex-col items-center gap-12">
        {posts.map((v, i) => (
          <PostCard key={i} post={v} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
