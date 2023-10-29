import { useEffect, useState } from "react";
import MediaCard from "~/components/MediaCard";
import NavbarDesktop from "~/components/NavbarDesktop";
import Search from "~/components/Search";
import Title from "~/components/Title";
import type { MediaItem } from "~/types/mediaTypes";
import { api } from "~/utils/api";
import searchMediaItems from "~/utils/search";

export default function TV() {
  const [filteredBySearch, setFilteredBySearch] = useState<MediaItem[] | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const data = api.media.getAll
    .useQuery()
    .data?.filter((item) => item.category === "TV Series");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (data) {
      const filtered: MediaItem[] | null = searchMediaItems(
        data,
        term,
        "TV Series",
      );
      setFilteredBySearch(filtered);
    }
  };

  return (
    <div className="lg:flex lg:gap-9">
      <NavbarDesktop />
      <div>
        <Search
          onSearch={handleSearch}
          placeholderText="Search for TV series"
        />
        {filteredBySearch !== null ? (
          <>
            <p>
              Found {filteredBySearch.length} results for &apos;{searchTerm}
              &apos;
            </p>
            <div className="grid max-w-[1240px] grid-cols-2 gap-4 pb-6 md:grid-cols-3 md:gap-10 lg:grid-cols-4">
              {filteredBySearch?.map((item) => (
                <MediaCard key={item?.title} media={item} />
              ))}
            </div>
          </>
        ) : (
          <>
            <Title text="TV Series" />
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
