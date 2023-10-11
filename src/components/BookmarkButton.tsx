import Image from "next/image";
import { useState } from "react";

export default function BookmarkButton(props: {
  isBookmarked: boolean;
  title: string;
}) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(props.isBookmarked);

  function toggleBookmark() {
    const data = {
      title: props.title,
    };

    fetch("/api/updateDatavs2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setIsBookmarked(!isBookmarked);
  }

  return (
    <button
      onClick={toggleBookmark}
      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#000000]/50"
    >
      {isBookmarked ? (
        <Image
          src={"/assets/icon-bookmark-full.svg"}
          alt="full bookmark icon"
          width={12}
          height={14}
        />
      ) : (
        <Image
          src={"/assets/icon-bookmark-v2.svg"}
          alt="empty bookmark icon"
          width={12}
          height={14}
        />
      )}
    </button>
  );
}
