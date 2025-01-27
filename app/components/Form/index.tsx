"use client";

import { generateStory } from "@/actions/storyGenerateActions";
import React, { useState } from "react";
import Link from "next/link";

export default function Form() {
  const readingLevels = [
    "Early Reader (Ages 5-6)",
    "Beginning Reader (Ages 6-7)",
    "Intermediate Reader (Ages 7-8)",
    "Advanced Reader (Ages 8-10)",
  ];
  const artStyles = ["realistic", "semi-realistic", "fantasy", "cyberpunk"];

  const languages = ["English", "Spanish", "French", "German", "Chinese"];
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyID, setStoryID] = useState<number | undefined>();

  const [formData, setFormData] = useState({
    description: "",
    characters: "",
    pages: 10,
    readingLevel: readingLevels[0],
    language: "English",
    artStyle: artStyles[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(formData);
    e.preventDefault();
    setIsGenerating(true);

    try {
      const response = await generateStory(formData);
      setStoryID(response?.id);
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Story Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Character Description
        </label>
        <textarea
          name="characters"
          value={formData.characters}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Pages
          </label>
          <select
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          >
            <option value="10">10 pages</option>
            <option value="20">20 pages</option>
            <option value="30">30 pages</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reading Level
          </label>
          <select
            name="readingLevel"
            value={formData.readingLevel}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          >
            {readingLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Art Style
          </label>
          <select
            name="artStyle"
            value={formData.artStyle}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          >
            {artStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
      </div>

      {storyID ? (
        <div className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center">
          <Link href={`/stories/${storyID}`}>Read The Story</Link>
        </div>
      ) : (
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Story"}
        </button>
      )}
    </form>
  );
}
