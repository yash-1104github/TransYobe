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

    const WORKER_URL = "https://aged-wind-2f7b.gyash1104.workers.dev";

    async function getTranscript(videoId: any) {
      console.log(`Fetching transcript for video: ${videoId}`);

      const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
        lang: "en",
        fetchOptions: {
          fetch: (url: any) =>
            fetch(`${WORKER_URL}?v=${videoId}`),
        },
      });

      return transcript;
    };

    const transcript = await getTranscript(videoId);

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
}
