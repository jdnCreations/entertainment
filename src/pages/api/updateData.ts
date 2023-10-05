import type { NextApiRequest, NextApiResponse } from "next";

export default function update(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method === "PUT") {
  //   const updatedData = JSON.parse(req.body);
  //   fs.writeFileSync(
  //     "/data-updated.json",
  //     JSON.stringify(updatedData, null, 2),
  //     "utf-8",
  //   );
  //   res.status(200).json({ success: true });
  // }
  // if (req.method === "GET") {
  //   console.log("GET REQUEST WOW");
  //   res.status(200).json({ success: true });
  // }
  // if (req.method === "POST") {
  //   res.status(405).end();
  // }
}
