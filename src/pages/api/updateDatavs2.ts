// pages/api/updateData.ts

import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import type { MediaItem } from "~/types/mediaTypes";

function isMediaItem(item: unknown): item is MediaItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "title" in item &&
    "isBookmarked" in item
  );
}

interface RequestBody {
  title: string;
}

export default async function updateData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { title } = req.body as RequestBody;

      const filePath = path.join(process.cwd(), "public/data.json");
      const rawData = await fs.readFile(filePath, "utf-8");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: MediaItem[] = JSON.parse(rawData);

      if (Array.isArray(data) && data.every(isMediaItem)) {
        // valid data
        const updatedData: MediaItem[] = data.map((item: MediaItem) => {
          if (item.title === title) {
            item.isBookmarked = !item.isBookmarked;
          }
          return item;
        });

        await fs.writeFile(
          filePath,
          JSON.stringify(updatedData, null, 2),
          "utf-8",
        );

        res.status(200).json({ message: "Update successful" });
      } else {
        // invalid data
        return res
          .status(500)
          .json({ error: "JSON data does not match MediaItem" });
      }
    } catch (error) {
      res.status(500).json({ error: "Update failed" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
