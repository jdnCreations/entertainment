import * as fs from "fs";
import * as path from "path";

export default function updateBookmarkStatus(itemTitle, newStatus) {
  const filePath = path.join(process.cwd(), "../../public/data.json"); // Adjust the file path if necessary

  console.log(filePath);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const jsonData = JSON.parse(data);
    const updatedData = jsonData.map((item) => {
      if (item.title === itemTitle) {
        item.isBookmarked = newStatus;
      }
      return item;
    });

    fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log(`Bookmark status updated for "${itemTitle}" to ${newStatus}`);
    });
  });
}

// Example usage:
// updateBookmarkStatus('Item 2', true); // Update the 'isBookmarked' property
