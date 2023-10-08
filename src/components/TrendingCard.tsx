import Image from "next/image";
import type { MediaItem } from "~/types/mediaTypes";
import BookmarkButton from "./BookmarkButton";

export default function TrendingCard(props: { media: MediaItem }) {
  const imagePath = props.media.thumbnail.trending.small.slice(1);
  const { title, category, rating, year } = props.media;

  return (
    <div className="relative h-full w-full snap-start">
      <div className="absolute bottom-0 h-[70px] w-full rounded-b-lg  bg-gradient-to-t from-[#000000] to-[#000000]/0"></div>
      <div className="absolute h-[140px] w-full md:h-[230px]">
        <BookmarkButton isBookmarked={props.media.isBookmarked} />
        {/* <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#000000]/50">
          <Image
            src={"/assets/icon-bookmark-v2.svg"}
            alt="empty bookmark icon"
            width={12}
            height={14}
          />
        </div> */}
      </div>
      <div className="absolute bottom-4 left-4 flex flex-col text-[0.75rem] font-light text-white/75">
        <div className="flex items-center gap-2">
          <p>{year}</p>
          <div className="h-[3px] w-[3px] rounded-full bg-[#979797]"></div>
          <p>{category}</p>
          <div className="h-[3px] w-[3px] rounded-full bg-[#979797]"></div>
          <p>{rating}</p>
        </div>
        <p className="text-body-m font-medium text-white">{title}</p>
      </div>
      <Image
        src={imagePath}
        alt={props.media.title}
        className="rounded-lg md:h-[230px] md:w-[470px]"
        height={140}
        width={240}
      />
    </div>
  );
}
