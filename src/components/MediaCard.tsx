import Image from "next/image";

export default function MediaCard() {
  return (
    <div className="relative max-w-[164px]">
      <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#000000]/50">
        <Image
          src={"/images/icon-bookmark-v2.svg"}
          alt="empty bookmark icon"
          width={12}
          height={14}
        />
      </div>
      <Image
        src={"/images/thumbnails/beyond-earth/trending/small.jpg"}
        alt="beyond earth thumbnail"
        width={164}
        height={110}
        className="rounded-lg"
      />
      <div className="flex flex-col text-[0.75rem] font-light text-white/75">
        <div className="flex items-center gap-2">
          <p>2019</p>
          <div className="h-[3px] w-[3px] rounded-full bg-[#979797]"></div>
          <p>Movie</p>
          <div className="h-[3px] w-[3px] rounded-full bg-[#979797]"></div>
          <p>PG</p>
        </div>
        <p className="text-body-m font-medium text-white">Beyond Earth</p>
      </div>
    </div>
  );
}
