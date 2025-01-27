import React from "react";
import { Book } from "@/app/components/Book";

export default async function StoryReader({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const storyID = (await params).id;
  return (
    <div className="relative">
      <Book storyID={storyID} />
    </div>
  );
}
