import Post from '@/components/post'
import config from '@/config'
import { getAllPosts } from '@/utils/mdx'

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }) {
    params = await params
    const posts = await getAllPosts()
    const post = posts.find(post => post.slug === params.slug)
    return {
        title: post.frontmatter.title,
        keywords: post.frontmatter.tags,
        description: post.frontmatter.description,
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            keywords: post.frontmatter.tags,
            siteName: config.title,
            url: `${config.url}/${post.slug}`,
        },
    }
}

export default async function BlogPost({ params }) {
    try {
        params = await params
        const posts = await getAllPosts()
        const post = posts.find(post => post.slug === params.slug)
        const similar = posts.filter(post => post.slug !== params.slug)

        return (
            <Post post={{ ...post, similar }} />
        )
    } catch (error) {
        console.error('Error loading post:', error)
        return <div>Error loading post: {error.message}</div>
    }
}