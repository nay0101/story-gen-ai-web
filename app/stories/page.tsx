import React from "react";
import { StoryList } from "@/app/components/StoryList";

export default function Stories() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Stories</h1>
        <StoryList />
      </div>
    </div>
  );
}
