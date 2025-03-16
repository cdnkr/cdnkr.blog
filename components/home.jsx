"use client";

import { useState } from "react";
import PostList from "./postlist";
import TagSelection from "./tagselection";
import Input from "./ui/input";
import { Block } from "./ui/block";
import config from "@/config";

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
    <div className="w-full flex flex-col gap-12 py-8 lg:py-12">
      <div className="w-full flex flex-col gap-8 lg:gap-16 relative">
        <div className="flex lg:col-span-4 flex-col gap-8">
          <Filters
            search={search}
            setSearch={setSearch}
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

function Filters({ search, setSearch, tags, tag, setTag }) {
  return (
    <>
      <div className="w-full flex justify-center flex-wrap gap-2 lg:px-4">
        <TagSelection tags={tags} selectedTag={tag} setSelectedTag={setTag} />
      </div>
    </>
  );
}
