import Image from "next/image";
import type { MediaItem } from "~/types/mediaTypes";

export default function MediaCard(props: { media: MediaItem }) {
  const imagePath = props.media.thumbnail.regular.small.slice(1);
  const { category, rating, year, title } = props.media;

  return (
    <div className="relative max-w-[164px]">
      <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#000000]/50">
        <Image
          src={"/assets/icon-bookmark-v2.svg"}
          alt="empty bookmark icon"
          width={12}
          height={14}
        />
      </div>
      <Image
        src={imagePath}
        alt={props.media.title}
        width={164}
        height={110}
        className="rounded-lg"
      />
      <div className="flex flex-col text-[0.75rem] font-light text-white/75">
        <div className="flex items-center gap-2">
          <p>{year}</p>
          <div className="h-[3px] w-[3px] rounded-full bg-[#979797]"></div>
          <p>{category}</p>
          <div className="h-[3px] w-[3px] rounded-full bg-[#979797]"></div>
          <p>{rating}</p>
        </div>
        <p className="text-body-m font-medium text-white">{title}</p>
      </div>
    </div>
  );
}
