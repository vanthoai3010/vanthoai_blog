import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight
}) {
  console.log("PostList", post);
  const imageProps = post?.mainImage
    ? urlForImage(post.mainImage)
    : null;
  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;
  return (
    <>
      <div
        className={cx(
          "group cursor-pointer block overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300",
          minimal && "grid gap-10 md:grid-cols-2"
        )}
      >
        {/* Image Section */}
        <div className="overflow-hidden rounded-t-2xl md:rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]">
          <Link
            href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug.current}`}
            className={cx(
              "relative block",
              aspect === "landscape"
                ? "aspect-video"
                : aspect === "custom"
                  ? "aspect-[5/4]"
                  : "aspect-square"
            )}
          >
            {imageProps ? (
              <Image
                src={imageProps.src}
                alt={post.mainImage.alt || "Thumbnail"}
                {...(post.mainImage.blurDataURL && {
                  placeholder: "blur",
                  blurDataURL: post.mainImage.blurDataURL,
                })}
                priority={!!preloadImage}
                className="object-cover transition-transform duration-500"
                fill
                sizes="(max-width: 768px) 30vw, 33vw"
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-300">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        {/* Content Section */}
        <div className={cx(minimal && "flex items-center")}>
          <div className="p-4 md:p-6">
            {/* Categories + Read time */}
            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
              <CategoryLabel categories={post.categories} nomargin={minimal} />
              <span className="ml-2 mt-5 text-sm text-gray-600 dark:text-gray-500">
                {post.estReadingTime || "5"} min read
              </span>
            </div>

            {/* Title */}
            <h2
              className={cx(
                fontSize === "large"
                  ? "text-2xl"
                  : minimal
                    ? "text-3xl"
                    : "text-lg",
                fontWeight === "normal"
                  ? "line-clamp-2 font-medium tracking-normal text-black dark:text-white"
                  : "font-semibold leading-snug tracking-tight text-black dark:text-white",
                "mt-2"
              )}
            >
              <Link
                href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug.current}`}
              >
                <span
                  className="inline-block bg-gradient-to-r from-green-300 to-blue-300 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size,color] duration-300 hover:text-blue-600 group-hover:bg-[length:100%_2px]"
                >
                  {post.title}
                </span>
              </Link>
            </h2>

            {/* Excerpt */}
            {post.excerpt && !minimal && (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                <Link
                  href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug.current}`}
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  {post.excerpt}
                </Link>
              </p>
            )}

            {/* Author Info */}
            <div className="mt-6 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <Link href={`/author/${post?.author?.slug?.current}`}>
                <div className="flex items-center gap-3">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden">
                    {post?.author?.image && (
                      <Image
                        src={AuthorimageProps.src}
                        alt={post?.author?.name}
                        className="object-cover"
                        fill
                        sizes="24px"
                      />
                    )}
                  </div>
                  <span className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post?.author?.name}
                  </span>
                </div>
              </Link>
              <span className="text-xs text-gray-300 dark:text-gray-600">&bull;</span>
              <time
                className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                dateTime={post?.publishedAt || post._createdAt}
              >
                {format(parseISO(post?.publishedAt || post._createdAt), "MMMM dd, yyyy")}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
