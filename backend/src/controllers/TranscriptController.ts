import { extractVideoId } from "../utils/extractVideoId.js";
import { Request, Response, NextFunction } from "express";
import { fetchTranscript } from "youtube-transcript-plus";
import { ensureIndex, loadSampleData } from "../RAG_piplines/dataIngesion.js";
import findTranscript from "../utils/api.js";

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

    const response = await findTranscript(videoId);

    //@ts-ignore
    const combinedTranscript = response.transcript
      .map((item: any) => item.text)
      .join(" ");
    console.log("Combined Transcript:", combinedTranscript);

    if (combinedTranscript.trim().length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No transcript found for this video." });
    }

    const finaltranscript = combinedTranscript
      .replace(/&gt;&gt;/g, ">>")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
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
