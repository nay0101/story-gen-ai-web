"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getStory } from "@/actions/storyGenerateActions";
import { Page } from "@/app/types/data";

export function Book({ storyID }: { storyID: number }) {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await getStory(storyID);
        setPages(data.pages ?? []);
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStory();
  }, [storyID]);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage >= pages.length + 1;

  const renderTitlePage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-8 text-black">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">{pages[0].title}</h1>
      </div>
    </div>
  );

  const renderLastPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-8 text-black">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">The End</h1>
      </div>
    </div>
  );

  const renderStoryPages = () => {
    const currentPageData = pages[currentPage - 1];

    return (
      <div className="flex justify-center items-center min-h-screen bg-amber-50 p-8 text-black">
        <div className={`flex w-full max-w-8xl h-[600px] bg-white shadow-2xl`}>
          <div className="flex-1 p-8 border-r border-gray-200">
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed">
                {currentPageData.page_content}
              </p>
            </div>
            <div className="absolute bottom-4 right-4 text-gray-500">
              Page {currentPage}
            </div>
          </div>

          <div className="flex-1 relative">
            <Image
              width={1024}
              height={1024}
              src={currentPageData.image_url}
              alt={`Illustration for page ${currentPage}`}
              className="w-full h-full object-fit"
            />
          </div>
        </div>
      </div>
    );
  };

  if (isLoading || !pages) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <>
      {/* Content */}
      {isFirstPage
        ? renderTitlePage()
        : isLastPage
        ? renderLastPage()
        : renderStoryPages()}

      <div className="fixed bottom-4 left-0 right-0 flex justify-center space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={isFirstPage}
          className={`p-2 ${isFirstPage && "opacity-0"}`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={isLastPage}
          className={`p-2 ${isLastPage && "opacity-0"}`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
