"use client";

import Link from "next/link";
import { useState } from "react";
import PostList from "./postlist";
import TagSelection from "./tagselection";
import Button from "./ui/button";
import { GitHub, LinkedIn, XDotCom } from "./ui/icons";
import Input from "./ui/input";

export default function Home({
    posts,
    tags
}) {
    const [search, setSearch] = useState("");
    const [tag, setTag] = useState("");

    const filteredPosts = posts.filter((post) => {
        return post.frontmatter.title.toLowerCase().includes(search.toLowerCase()) && (tag === "" || post.frontmatter.tags.includes(tag));
    });

    return (
        <div className="w-full flex flex-col gap-12 py-12">
            <div className="w-full grid grid-cols-12 gap-8 relative">
                <div className="flex flex-col gap-8 lg:hidden col-span-12">
                    <Filters
                        search={search}
                        setSearch={setSearch}
                        tags={tags}
                        tag={tag}
                        setTag={setTag}
                    />
                </div>
                <div className="w-full flex flex-col gap-12 col-span-12 lg:col-span-8">
                    <PostList posts={filteredPosts} />
                </div>
                <div className="hidden lg:flex col-span-12 lg:col-span-4 flex-col gap-8">
                    <Filters
                        search={search}
                        setSearch={setSearch}
                        tags={tags}
                        tag={tag}
                        setTag={setTag}
                    />
                    <Socials />
                </div>
            </div>
        </div>
    );
}

function Socials() {
    return (
        <div className="flex flex-col gap-8 px-2 py-4">
            <Link href="https://github.com/cdnkr" target="_blank" rel="noopener noreferrer">
                <Button>
                    <GitHub className="size-6 stroke-black fill-black" />/cdnkr
                </Button>
            </Link>

            <Link href="https://www.linkedin.com/in/cdnkr" target="_blank" rel="noopener noreferrer">
                <Button>
                    <LinkedIn className="size-6 fill-black" />/in/cdnkr
                </Button>
            </Link>

            <Link href="https://x.com/chaddanker" target="_blank" rel="noopener noreferrer">
                <Button>
                    <XDotCom className="size-6 fill-black" />/chaddanker
                </Button>
            </Link>
        </div>
    )
}

function Filters({
    search,
    setSearch,
    tags,
    tag,
    setTag
}) {
    return (
        <>
            <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="w-full flex flex-wrap gap-8 lg:px-4">
                <TagSelection
                    tags={tags}
                    selectedTag={tag}
                    setSelectedTag={setTag}
                />
            </div>
        </>
    )
}
