"use server";

import { Story } from "@/app/types/data";

export async function getStories() {
  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/api/stories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
}

export async function getStory(storyID: number) {
  try {
    const response = await fetch(
      `${process.env.API_ENDPOINT}/api/stories/${storyID}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
}

export async function generateStory(formData: Omit<Story, "id" | "title">) {
  try {
    const response = await fetch(
      `${process.env.API_ENDPOINT}/api/stories/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
}
