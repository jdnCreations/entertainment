import { useState } from "react";
import type { MediaItem } from "~/types/mediaTypes";

export default function Search(props: { onSearch: (term: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex max-w-[400px] items-center gap-4 pb-6 xl:pt-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-[32px] w-[32px]">
        <path
          d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
          fill="#FFF"
        />
      </svg>
      <input
        className="w-full bg-darkest-blue text-[1rem] font-light text-white outline-none placeholder:font-light placeholder:text-white/50 md:text-heading-m"
        type="text"
        placeholder="Search for movies or TV series"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          props.onSearch(e.target.value);
        }}
      />
    </div>
  );
}
