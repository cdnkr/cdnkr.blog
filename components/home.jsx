"use client";

import { useState } from "react";
import PostList from "./postlist";
import TagSelection from "./tagselection";

export default function Home({ posts, tags }) {
  const [tag, setTag] = useState("");

  const filteredPosts = posts.filter((post) => {
    return (
      (tag === "" || post.frontmatter.tags.includes(tag))
    );
  });

  return (
    <div className="w-full flex flex-col gap-12 py-8 lg:py-12">
      <div className="w-full flex flex-col gap-8 lg:gap-12 relative">
        <div className="flex lg:col-span-4 flex-col gap-8">
          <Filters
            tags={tags}
            tag={tag}
            setTag={setTag}
          />
        </div>
        <div className="w-full flex justify-center flex-col gap-y-8 lg:gap-y-16 gap-x-42">
          <PostList posts={filteredPosts} />
        </div>
      </div>
    </div>
  );
}

function Filters({ tags, tag, setTag }) {
  return (
    <div className="w-full flex justify-center flex-wrap gap-2 lg:px-4 max-w-5xl mx-auto">
      <TagSelection tags={tags} selectedTag={tag} setSelectedTag={setTag} />
    </div>
  );
}
