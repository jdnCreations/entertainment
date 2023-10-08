import Image from "next/image";
import type { MediaItem } from "~/types/mediaTypes";
import BookmarkButton from "./BookmarkButton";

export default function MediaCard(props: { media: MediaItem }) {
  const imagePath = props.media.thumbnail.regular.small.slice(1);
  const { category, rating, year, title } = props.media;

  return (
    <div className="relative max-w-[164px] md:max-w-[220px] lg:max-w-[280px]">
      <BookmarkButton isBookmarked={props.media.isBookmarked} />
      <Image
        src={imagePath}
        alt={title}
        width={164}
        height={110}
        className="rounded-lg md:w-[220px] lg:w-[280px]"
      />
      <div className="flex flex-col pt-2 text-[0.75rem] font-light text-white/75">
        <div className="flex items-center gap-2">
          <p>{year}</p>
          <div className="h-[3px] w-[3px] rounded-full bg-[#979797]"></div>
          <div className="flex items-center gap-1">
            {category === "Movie" ? (
              <Image
                src={"/assets/icon-category-movie.svg"}
                alt="movie icon"
                width={10}
                height={10}
              />
            ) : (
              <Image
                src={"/assets/icon-category-tv.svg"}
                alt="tv icon"
                width={10}
                height={10}
              />
            )}

            <p>{category}</p>
          </div>
          <div className="h-[3px] w-[3px] rounded-full bg-[#979797]"></div>
          <p>{rating}</p>
        </div>
        <p className="text-body-m font-medium text-white">{title}</p>
      </div>
    </div>
  );
}
