import { NextApiRequest, NextApiResponse } from "next";
import React from "react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { review } = req.body;

  if (!review) {
    return res.status(400).json({ error: "Review is required" });
  }

  const result = await fetch("https://www.getrevue.co/api/v2/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review }),
  });
  console.log("result", result);
  const data = await result.json();

  if (!result.ok) {
    return res.status(500).json({ error: data.error });
  }

  return res.status(201).json({ error: "" });
}
