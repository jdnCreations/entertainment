import { useEffect, useState } from "react";
import MediaCard from "~/components/MediaCard";
import NavbarDesktop from "~/components/NavbarDesktop";
import Search from "~/components/Search";
import Title from "~/components/Title";
import type { MediaItem } from "~/types/mediaTypes";
import searchMediaItems from "~/utils/search";

export default function Movies() {
  const [data, setData] = useState<MediaItem[] | null>(null);
  const [filteredBySearch, setFilteredBySearch] = useState<MediaItem[] | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((json: MediaItem[]) => {
        const filteredMovies = json.filter(
          (item: MediaItem) => item.category === "Movie",
        );
        setData(filteredMovies);
      })
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (data) {
      const filtered: MediaItem[] | null = searchMediaItems(
        data,
        term,
        "Movie",
      );
      setFilteredBySearch(filtered);
    }
  };

  return (
    <div className="lg:flex lg:gap-9">
      <NavbarDesktop />
      <div>
        <Search onSearch={handleSearch} placeholderText="Search for movies" />
        {filteredBySearch !== null ? (
          <>
            <Title
              text={`
              Found ${filteredBySearch.length} results for '${searchTerm}'`}
            />
            <div className="grid max-w-[1240px] grid-cols-2 gap-4 pb-6 md:grid-cols-3 md:gap-10 lg:grid-cols-4">
              {filteredBySearch?.map((item) => (
                <MediaCard key={item?.title} media={item} />
              ))}
            </div>
          </>
        ) : (
          <>
            <Title text="Movies" />
            <div className="grid grid-cols-2 gap-4 pb-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
              {data?.map((item) => (
                <MediaCard key={item?.title} media={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
