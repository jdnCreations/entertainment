import Image from "next/image";
import type { MediaItem } from "~/types/mediaTypes";
import BookmarkButton from "./BookmarkButton";

export default function TrendingCard(props: { media: MediaItem }) {
  const imagePath = props.media.thumbnailRegularSmall.slice(1);
  const { title, category, rating, year } = props.media;

  return (
    <div className="relative h-full w-full snap-start">
      <div className="absolute bottom-0 h-[70px] w-full rounded-b-lg  bg-gradient-to-t from-[#000000] to-[#000000]/0"></div>
      <div className="absolute h-[140px] w-full md:h-[230px]">
        <BookmarkButton title={title} isBookmarked={props.media.isBookmarked} />
      </div>
      <div className="absolute bottom-4 left-4 flex flex-col text-[0.75rem] font-light text-white/75 md:text-body-m">
        <div className="flex items-center gap-2">
          <p>{year}</p>
          <div className="h-[3px] w-[3px] rounded-full bg-[#979797]"></div>
          <p>{category}</p>
          <div className="h-[3px] w-[3px] rounded-full bg-[#979797]"></div>
          <p>{rating}</p>
        </div>
        <p className="text-body-m font-medium text-white md:text-heading-s">
          {title}
        </p>
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
