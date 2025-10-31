import { extractVideoId } from "../utils/extractVideoId.js";
import { Request, Response, NextFunction } from "express";
import { fetchTranscript } from "youtube-transcript-plus";
import { ensureIndex, loadSampleData } from "../RAG_piplines/dataIngesion.js";
import {
  createCollection,
  loadSampleData,
} from "../RAG_piplines/dataIngesion.js";

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
    console.log('inside try block of controller transcript');
    console.log(`Fetching transcript for video: ${videoId}`);
    const response = await fetch(`https://trans-yobe.vercel.app/api/getTranscript?videoId=${videoId}`);
    console.log("response", response);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch transcript" });
    }

    const data = await response.json();
    const transcript = data.transcript;

    if (transcript.length > 0) {
      const propertranscript = transcript.map((item: types) => item.text).join(" ");

      const finaltranscript = propertranscript
        .replace(/&amp;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/\\n/g, " ")
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      console.log("Fetched Transcipt from api");

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
