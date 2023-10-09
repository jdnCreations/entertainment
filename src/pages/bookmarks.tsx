import { useEffect, useState } from "react";
import MediaCard from "~/components/MediaCard";
import NavbarDesktop from "~/components/NavbarDesktop";
import Search from "~/components/Search";
import Title from "~/components/Title";
import type { MediaItem } from "~/types/mediaTypes";

export default function Bookmarks() {
  const [data, setData] = useState<MediaItem[] | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((json: MediaItem[]) => {
        const filteredMovies = json.filter(
          (item: MediaItem) => item.isBookmarked,
        );
        setData(filteredMovies);
      })
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  return (
    <div className="lg:flex lg:gap-9">
      <NavbarDesktop />
      <div>
        <Search />
        <Title text="Bookmarked Movies" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {data
            ?.filter((item: MediaItem) => item.category === "Movie")
            .map((item) => <MediaCard key={item.title} media={item} />)}
        </div>
        <Title text="Bookmarked TV Series" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {data
            ?.filter((item: MediaItem) => item.category === "TV Series")
            .map((item) => <MediaCard key={item.title} media={item} />)}
        </div>
      </div>
    </div>
  );
}
