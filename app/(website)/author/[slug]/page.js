import AuthorPage from "./author";
import { getAuthorBySlug, getAllAuthorsSlugs } from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllAuthorsSlugs(); // [{ slug: "john-doe" }, ...]
}

export async function generateMetadata({ params }) {
  const author = await getAuthorBySlug(params.slug);
  return { title: author ? `Author: ${author.name}` : "Author not found" };
}

export default async function AuthorSlugPage({ params }) {
  const author = await getAuthorBySlug(params.slug);
  if (!author) {
    return <div>Author not found</div>;
  }
  return <AuthorPage author={author} />;
}
