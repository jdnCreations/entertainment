import { useEffect, useState } from "react";
import MediaCard from "~/components/MediaCard";
import NavbarDesktop from "~/components/NavbarDesktop";
import Search from "~/components/Search";
import Title from "~/components/Title";
import type { MediaItem } from "~/types/mediaTypes";

export default function Movies() {
  const [data, setData] = useState<MediaItem[] | null>(null);

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

  return (
    <div className="lg:flex lg:gap-9">
      <NavbarDesktop />
      <div>
        <Search />
        <Title text="Movies" />
        <div className="grid grid-cols-2 gap-4 pb-6 md:grid-cols-3 lg:grid-cols-4">
          {data?.map((item) => <MediaCard key={item?.title} media={item} />)}
        </div>
      </div>
    </div>
  );
}
