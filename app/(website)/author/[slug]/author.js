"use client";

import Image from "next/image";
import Container from "@/components/container";
import { useEffect, useState } from "react";

function generateFakeContributions() {
  return Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  );
}

const ContributionBox = ({ level }) => {
  const colors = [
    "bg-gray-200",
    "bg-green-100",
    "bg-green-300",
    "bg-green-500",
    "bg-green-700",
  ];
  return (
    <div
      className={`w-3 h-3 md:w-4 md:h-4 ${colors[level]} rounded-sm`}
      title={`${level} contributions`}
    />
  );
};

export default function AuthorPage({ author }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fakeData = generateFakeContributions();
    setData(fakeData);
  }, []);

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Author Info */}
        <div className="space-y-6">
          <div className="w-full overflow-hidden rounded-xl shadow-md aspect-video relative">
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight dark:text-white">
              {author.name}
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
              {author.bio}
            </p>
          </div>
        </div>

        {/* Contribution Chart + Spotify */}
        <div className="flex flex-col">
          <div className="text-sm sm:text-base text-gray-500 mb-4 font-medium">
            24 contributions in the last year
          </div>
          <div className="flex space-x-[2px] sm:space-x-1 overflow-x-auto pb-2 max-w-full">
            {data.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col space-y-[2px] sm:space-y-1">
                {week.map((level, dayIdx) => (
                  <ContributionBox key={dayIdx} level={level} />
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            {["Jun", "Sep", "Dec", "Mar", "Jun"].map((month, idx) => (
              <span key={idx}>{month}</span>
            ))}
          </div>
          <div className="mt-4 flex items-center space-x-2 text-xs text-gray-500">
            <span>Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <ContributionBox key={level} level={level} />
              ))}
            </div>
            <span>More</span>
          </div>

          <div className="mt-8">
            <p className="mb-2 font-mono text-sm text-gray-600 dark:text-gray-400">
              🎧 List nhạc mình hay nghe khi code:
            </p>
            <div className="rounded-xl overflow-hidden">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/5MvtXEKhBlM0dh3sVrYUzO?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
