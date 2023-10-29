import { useSession } from "next-auth/react";
import { useState } from "react";
import MediaCard from "~/components/MediaCard";
import NavbarDesktop from "~/components/NavbarDesktop";
import Search from "~/components/Search";
import Title from "~/components/Title";
import type { MediaItem } from "~/types/mediaTypes";
import { api } from "~/utils/api";
import searchMediaItems from "~/utils/search";

type Bookmark = {
  id: string;
  mediaId: number;
  userId: string;
};

export default function Bookmarks() {
  const { data: session, status } = useSession();
  const [filteredBySearch, setFilteredBySearch] = useState<MediaItem[] | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const data = api.media.getAll.useQuery().data;

  const { data: bookmarks, refetch: refetchBookmarks } =
    api.bookmark.getAll.useQuery(undefined, {
      enabled: session?.user !== undefined,
    });

  const removeBookmark = api.bookmark.remove.useMutation({
    onSuccess: () => {
      void refetchBookmarks();
    },
  });

  const addBookmark = api.bookmark.add.useMutation({
    onSuccess: () => {
      void refetchBookmarks();
    },
  });

  function handleBookmark(mediaId: number, isBookmarked: boolean) {
    if (isBookmarked) {
      removeBookmark.mutate({ mediaId });
    }

    if (!isBookmarked) {
      addBookmark.mutate({ mediaId });
    }
  }

  if (data && Array.isArray(data)) {
    const bookmarked: undefined | MediaItem[] = data.filter(
      (item) =>
        bookmarks?.some(
          (bookmarkItem: Bookmark) => bookmarkItem.mediaId === item.id,
        ),
    );
    return (
      <>
        <Title text="Bookmarked Movies" />
        <div className="grid grid-cols-2 gap-4 pb-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {bookmarked
            ?.filter((item: MediaItem) => item.category === "Movie")
            .map((item) => (
              <MediaCard
                key={item.title}
                media={item}
                bookmarked={true}
                handleBookmark={handleBookmark}
              />
            ))}
        </div>
        <Title text="Bookmarked TV Series" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {bookmarked
            ?.filter((item: MediaItem) => item.category === "TV Series")
            .map((item) => (
              <MediaCard
                key={item.title}
                media={item}
                bookmarked={true}
                handleBookmark={handleBookmark}
              />
            ))}
        </div>
      </>
    );
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (data) {
      const filtered: MediaItem[] | null = searchMediaItems(data, term);
      setFilteredBySearch(filtered);
    }
  };

  return (
    <div className="lg:flex lg:gap-9">
      <NavbarDesktop />
      <div>
        <Search
          onSearch={handleSearch}
          placeholderText="Search for bookmarked shows"
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
                  handleBookmark={handleBookmark}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <Title text="Bookmarked Movies" />
            <div className="grid grid-cols-2 gap-4 pb-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
              {data
                ?.filter((item: MediaItem) => item.category === "Movie")
                .map((item) => (
                  <MediaCard
                    key={item.title}
                    media={item}
                    bookmarked={false}
                    handleBookmark={handleBookmark}
                  />
                ))}
            </div>
            <Title text="Bookmarked TV Series" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
              {data
                ?.filter((item: MediaItem) => item.category === "TV Series")
                .map((item) => (
                  <MediaCard
                    key={item.title}
                    media={item}
                    bookmarked={false}
                    handleBookmark={handleBookmark}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
