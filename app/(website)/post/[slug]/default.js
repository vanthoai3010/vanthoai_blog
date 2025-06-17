import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";

import CategoryLabel from "@/components/blog/category";
import AuthorCard from "@/components/blog/authorCard";

export default function Post(props) {
  const { loading, post } = props;

  const slug = post?.slug;

  if (!loading && !slug) {
    notFound();
  }

  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  return (
    <>
      <Container className="!pt-0">
        {/* Tiêu đề bài viết */}
        <div className="mx-auto mt-12 mb-6 max-w-screen-md px-4">
          <h1 className="text-brand-primary text-start text-4xl font-bold tracking-tight leading-tight dark:text-white">
            {post.title}
          </h1>
        </div>
      </Container>

      {/* Tác giả và danh mục */}
      <div className="mx-auto max-w-screen-md flex flex-col md:flex-row items-start justify-between gap-6 px-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 flex-shrink-0">
            {AuthorimageProps && (
              <Link href={`/author/${post.author.slug.current}`}>
                <Image
                  src={AuthorimageProps.src}
                  alt={post?.author?.name}
                  className="rounded-full object-cover border border-gray-300 dark:border-gray-700"
                  fill
                  sizes="48px"
                />
              </Link>
            )}
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800 dark:text-white">
              <Link href={`/author/${post.author.slug.current}`}>
                {post.author.name}
              </Link>
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post?.publishedAt || post._createdAt}>
                {format(parseISO(post?.publishedAt || post._createdAt), "MMMM dd, yyyy")}
              </time>
              <span>· {post.estReadingTime || "5"} min read</span>
            </div>
          </div>
        </div>

        {/* Nhãn danh mục */}
        <div className="mt-2 md:mt-0">
          <CategoryLabel categories={post.categories} />
        </div>
      </div>

      {/* Nội dung bài viết */}
      <Container>
        <article className="mx-auto max-w-screen-md mt-10 px-4">
          <div className="prose font-semibold prose-lg dark:prose-invert prose-a:text-blue-600 leading-relaxed">
            {post.body && <PortableText value={post.body} />}
          </div>

          {/* Nút trở lại */}
          <div className="my-10 flex justify-center">
            <Link
              href="/"
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400 rounded-full px-6 py-2 text-sm transition">
              ← View all posts
            </Link>
          </div>

          {/* Tác giả dưới cùng */}
          {post.author && (
            <div className="mt-12">
              <AuthorCard author={post.author} />
            </div>
          )}
        </article>
      </Container>

    </>
  );
}


