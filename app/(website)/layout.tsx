import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import BackToTopButton from "@/components/BackToTopButton";

async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    title: {
      default: settings?.title || "Blog | Van Thoai",
      template: "%s | Stablo",
    },
    description:
      settings?.description ||
      "A Next.js template for building blogs with Sanity and Tailwind CSS",
    keywords: ["Next.js", "Sanity", "Tailwind CSS"],
    authors: [{ name: "Surjith" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url: urlForImage(settings?.openGraphImage)?.src || "/img/opengraph.jpg",
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      title: settings?.title || "Blog | Van Thoai",
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();

  return (
    <>
      <Navbar {...settings} />
      <Suspense fallback={<LoadingSpinner />}>
        <div>{children}</div>
      </Suspense>
      <BackToTopButton />
      {/* Footer */}
      <Footer {...settings} />
    </>
  );
}

// export const revalidate = 60;
