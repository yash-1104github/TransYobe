import { extractVideoId } from "../utils/extractVideoId.js";
import { Request, Response, NextFunction } from "express";
import { fetchTranscript } from "youtube-transcript-plus";
import { ensureIndex, loadSampleData } from "../RAG_piplines/dataIngesion.js";
import { YoutubeTranscript } from "youtube-transcript-plus";
import { fetch } from "undici";

interface types {
  item: any;
  text: any;
  error: any;
}

export default async function handleTranscript(req: Request, res: Response) {
  const { youtubeUrl }: any = req.body;

  if (!youtubeUrl) {
    return res.status(400).json({ error: "Missing Youtube url." });
  }

  const videoId = extractVideoId(youtubeUrl);

  if (!videoId) {
    return res.status(400).json({ error: "Invalid YouTube URL." });
  }

  try {
    console.log(`Fetching transcript for video: ${videoId}`);

     const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      fetchOptions: {
        // override the internal fetch used by youtube-transcript-plus
        fetch: (url:any) =>
          fetch(url, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
              "Accept":
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
              "Accept-Language": "en-US,en;q=0.9",
              "Referer": "https://www.youtube.com/",
              "Connection": "keep-alive",
              "Upgrade-Insecure-Requests": "1",
              "Sec-Fetch-Dest": "document",
              "Sec-Fetch-Mode": "navigate",
              "Sec-Fetch-Site": "none",
              "Sec-Fetch-User": "?1",
            },
          }),
      },
    });

    if (transcript.length > 0) {
      const propertranscript = transcript
        .map((item: types) => item.text)
        .join(" ");

      const finaltranscript = propertranscript
        .replace(/&amp;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/\\n/g, " ")
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      console.log("Fetched Transcipt from api", finaltranscript);

      // await createCollection();
      console.log("Collection created");

      await loadSampleData(finaltranscript);

      console.log("Transcript saved in memory vector DB.");

      res.json({
        success: true,
        result: finaltranscript,
        message: "Transcript processed and stored in memory.",
      });
    } else {
      res
        .status(404)
        .json({ success: false, error: "No transcript found for this video." });
    }
  } catch (error: any) {
    console.error(`Error fetching transcript`, error);
    if (error.message.includes("No captions found")) {
      res
        .status(404)
        .json({ success: false, error: "No captions found for this video." });
    } else {
      res
        .status(500)
        .json({ success: false, error: "An unexpected error occurred." });
    }
  }
};
