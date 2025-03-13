"use client";

import { useState } from "react";
import PostList from "./postlist";
import TagSelection from "./tagselection";
import Input from "./ui/input";

export default function Home({ posts, tags }) {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  const filteredPosts = posts.filter((post) => {
    return (
      post.frontmatter.title.toLowerCase().includes(search.toLowerCase()) &&
      (tag === "" || post.frontmatter.tags.includes(tag))
    );
  });

  return (
    <div className="w-full flex flex-col gap-12 pb-12 pt-10">
      <div className="w-full flex flex-col-reverse lg:flex-col gap-16 lg:gap-8 lg:grid lg:grid-cols-12 relative">
        <div className="w-full flex flex-col gap-y-8 gap-x-4 lg:col-span-8">
          <PostList posts={filteredPosts} />
        </div>
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-8">
          <Filters
            search={search}
            setSearch={setSearch}
            tags={tags}
            tag={tag}
            setTag={setTag}
          />
        </div>
      </div>
    </div>
  );
}

function Filters({ search, setSearch, tags, tag, setTag }) {
  return (
    <>
      <Input
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="w-full flex flex-wrap gap-2 lg:px-4">
        <TagSelection tags={tags} selectedTag={tag} setSelectedTag={setTag} />
      </div>
    </>
  );
}
