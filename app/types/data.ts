export type Page = {
  page_number: number;
  page_content: string;
  image_url: string;
  story_id: number;
  title: string;
  id: number;
};

export type Story = {
  id: string;
  title: string;
  description: string;
  characters: string;
  readingLevel: string;
  language: string;
  pages: number;
  artStyle: string;
};
