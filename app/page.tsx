import React from "react";
import Form from "@/app/components/Form";

export default function StoryGenerator() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">AI Story Teller</h1>
        <Form />
      </div>
    </div>
  );
}
