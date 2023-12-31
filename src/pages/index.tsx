import Head from "next/head";
import { useEffect, useState } from "react";
import MediaCard from "~/components/MediaCard";
import NavbarDesktop from "~/components/NavbarDesktop";
import Search from "~/components/Search";
import Title from "~/components/Title";
import TrendingCard from "~/components/TrendingCard";
import type { MediaItem } from "~/types/mediaTypes";
import { api } from "~/utils/api";
import searchMediaItems from "~/utils/search";

export default function Home() {
  // const [data, setData] = useState<MediaItem[] | null>(null);
  const [filteredBySearch, setFilteredBySearch] = useState<MediaItem[] | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const data: MediaItem[] | undefined = api.media.getAll.useQuery().data;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (data) {
      const filtered: MediaItem[] | null = searchMediaItems(data, term);
      setFilteredBySearch(filtered);
    }
  };

  return (
    <>
      <Head>
        <title>Entertainment</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <div className="lg:flex lg:gap-9">
        <NavbarDesktop />
        <div className="max-w-full xl:max-w-[calc(100%-140px)]">
          <Search
            placeholderText="Search for movies or TV series"
            onSearch={handleSearch}
          />

          {filteredBySearch !== null ? (
            <>
              <Title
                text={`
              Found ${filteredBySearch.length} results for '${searchTerm}'`}
              />
              <div className="grid grid-cols-2 gap-4 pb-6 md:grid-cols-3 md:gap-10 lg:grid-cols-4">
                {filteredBySearch?.map((item) => (
                  <MediaCard
                    key={item?.title}
                    media={item}
                    bookmarked={false}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <Title text="Trending" />
              <div className="snap-x snap-mandatory gap-2 overflow-x-auto whitespace-nowrap">
                <div
                  className={`grid h-[140px] auto-cols-[240px] grid-flow-col gap-2 md:h-[230px] md:auto-cols-[470px]`}
                >
                  {data
                    ?.filter((item) => item.isTrending)
                    .map((item) => (
                      <TrendingCard key={item?.title} media={item} />
                    ))}
                </div>
              </div>
              <Title text="Recommended for you" />
              <div className="grid max-w-[1240px] grid-cols-2 gap-4 pb-6 md:grid-cols-3 md:gap-10 xl:grid-cols-4">
                {data?.map((item) => (
                  <MediaCard
                    key={item?.title}
                    media={item}
                    bookmarked={false}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
