import Image from "next/image";
import Container from "@/components/container";

export default function AuthorPage({ author }) {
  return (
    <Container>
      <div className="max-w-2xl mx-auto text-center py-12">
        <Image
          src={author.avatar}
          alt={author.name}
          width={120}
          height={120}
          className="rounded-full mx-auto"
        />
        <h1 className="mt-4 text-3xl font-bold dark:text-white">{author.name}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{author.bio}</p>
      </div>
    </Container>
  );
}
