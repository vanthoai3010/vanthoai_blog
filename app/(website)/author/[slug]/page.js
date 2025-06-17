import { getAllAuthorsSlugs, getAuthorPostsBySlug } from "@/lib/sanity/client";
import AuthorPage from "./author";
import { urlForImage } from "@/lib/sanity/image";

// Lấy dữ liệu tác giả theo slug
export async function generateStaticParams() {
  const slugs = await getAllAuthorsSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}


// Tạo metadata (optional SEO)
export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getAuthorPostsBySlug(slug);

  return {
    title: `${data?.author?.name || "Author"} | Author`,
    description: data?.author?.bio?.[0]?.children?.[0]?.text || "Author biography"
  };
}

// Trang chính
export default async function Page({ params }) {
  const { slug } = params;
  const data = await getAuthorPostsBySlug(slug);

  if (!data?.author) return <div>Author not found</div>;

  // Chuyển đổi dữ liệu tác giả
  const author = {
    name: data.author.name,
    image: urlForImage(data.author.image)?.src || "/default-avatar.png",
    bio: data.author.bio?.[0]?.children?.[0]?.text || ""
  };
  return <AuthorPage author={author} />;
}
