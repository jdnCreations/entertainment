import type { MediaItem } from "~/types/mediaTypes";

// Your search function
export default function searchMediaItems(
  data: MediaItem[],
  searchTerm: string,
  filterCategory?: string,
): MediaItem[] | null {
  // Start with the original data
  let filteredData = [...data];

  if (searchTerm === "") return null;

  // Apply filters based on criteria
  if (searchTerm) {
    filteredData = filteredData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  if (filterCategory) {
    filteredData = filteredData.filter(
      (item) => item.category === filterCategory,
    );
  }

  return filteredData;
}
