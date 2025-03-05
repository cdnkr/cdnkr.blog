import MDX from '@/components/mdx'
import Link from 'next/link'
import PostSectionNav from './postsectionnav'
import ShareButton from './share'
import Button from './ui/button'
import { ArrowLeft, ArrowRight } from './ui/icons'

export default function Post({ post }) {
    const { frontmatter } = post

    return (
        <div className="w-full flex flex-col gap-12 py-12">
            <div className="w-full flex flex-col gap-8">
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex justify-between">
                        <h3 className="text-2xl lg:text-4xl max-w-full text-wrap break-words font-black">{frontmatter.title}</h3>
                        <ShareButton title={frontmatter.title} text={frontmatter.description} />
                    </div>
                    <div className="w-full flex items-center flex-wrap gap-2">
                        <span className="text-gray-700 leading-none">
                            {frontmatter.date && (
                                <time dateTime={frontmatter.date}>
                                    {new Date(frontmatter.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </time>
                            )}
                        </span>
                        {frontmatter?.tags?.map((tag, i) => <span key={tag + i} className="text-sm uppercase text-primary font-bold">{tag}</span>)}
                    </div>
                    <p>
                        {frontmatter.description}
                    </p>
                </div>
                <div className="w-full grid grid-cols-12 gap-8 relative">
                    <PostSectionNav sectionTitles={post.sectionTitles} className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto pt-7" />
                    <article className="w-full flex flex-col gap-8 col-span-12 lg:col-span-8">
                        {post.sections.map((section, i) => (
                            <div key={i} id={encodeURIComponent(post.sectionTitles[i].replace(/#/g, ""))} className="w-full">
                                <MDX
                                    source={section}
                                />
                            </div>
                        ))}
                        <div className="w-full flex flex-col lg:flex-row justify-between gap-8">
                            {post?.previous ? (
                                <Link href={post.previous?.slug}>
                                    <Button outerClassName="lg:max-w-60" className="gap-3">
                                        <ArrowLeft className="shrink-0" />
                                        <span className="truncate">{post.previous?.frontmatter?.title}</span>
                                    </Button>
                                </Link>
                            ) : <div />}
                            {post?.next && (
                                <Link href={post.next?.slug}>
                                    <Button outerClassName="lg:max-w-60" className="gap-3">
                                        <span className="truncate">{post.next?.frontmatter?.title}</span>
                                        <ArrowRight className="shrink-0" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}
