import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { NextPage } from "next";
import Image from "next/image";

interface PostLayoutProps {
  params: { slug: string };
}

export const generateStaticParams = () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: PostLayoutProps) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "website",
      url: post.url,
      title: post.title,
      description: post.description,
      images: [
        post.thumbnail ? `/images/${post.thumbnail}` : "/images/IU_R.jpeg",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [
        post.thumbnail ? `/images/${post.thumbnail}` : "/images/IU_R.jpeg",
      ],
    },
  };
};

const PostLayout: NextPage<PostLayoutProps> = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <article>
      {post.thumbnail && (
        <div className="flex justify-center">
          <Image
            src={`/images/${post.thumbnail}`}
            alt={post.title}
            width={512}
            height={512}
          />
        </div>
      )}
      <div className="text-center">
        <h2 className="text-4xl font-bold">{post.title}</h2>
        <div className="mt-4">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "yyyy년 M월 d일")}
          </time>
        </div>
      </div>
      <div className="my-12 max-w-screen-md mx-auto">
        <div
          className="[&>ol>li]:mt-4 [&>ol>li>p>strong]:text-2xl [&>h3]:font-semibold [&>h3]:text-2xl [&>h3]:my-6 [&>h3:last-child]:text-blue-500"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </div>
    </article>
  );
};

export default PostLayout;
