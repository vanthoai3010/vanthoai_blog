'use client';
import { useState } from "react";
import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";

export default function Post({ posts }) {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    posts && (
      <Container>
        {/* Phần 2 bài nổi bật đầu tiên */}
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2">
          {visiblePosts.slice(0, 2).map((post) => (
            <PostList
              key={post._id}
              post={post}
              aspect="landscape"
              preloadImage={true}
            />
          ))}
        </div>

        {/* Các bài còn lại */}
        <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.slice(2).map((post) => (
            <PostList key={post._id} post={post} aspect="square" />
          ))}
        </div>

        {/* Nút Load More */}
        {visibleCount < posts.length && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white px-5 sm:px-7 py-2.5 text-sm font-semibold text-gray-800 shadow-md transition duration-300 ease-out hover:text-white hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0 rounded-full" />
              <span className="relative z-10">Load More</span>
            </button>
          </div>
        )}
      </Container>
    )
  );
}
