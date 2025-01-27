"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Book } from "lucide-react";
import { getStories } from "@/actions/storyGenerateActions";
import { Story } from "@/app/types/data";

export function StoryList() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchStories = async () => {
    try {
      const data = await getStories();
      setStories(data.stories ?? []);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }
  return (
    <>
      {stories.length === 0 ? (
        <div className="p-6 text-center">
          <Book className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No stories yet
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by creating your first story
          </p>
          <Link href="/">
            <button>Create Story</button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories?.map((story) => (
            <div
              key={story.id}
              className="border-2 boder-blue-600 p-6 hover:shadow-lg transition-shadow"
            >
              <Link href={`/stories/${story.id}`}>
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
                    {story.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Language:</span>
                    <span className="font-medium">{story.language}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pages:</span>
                    <span className="font-medium">{story.pages}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
