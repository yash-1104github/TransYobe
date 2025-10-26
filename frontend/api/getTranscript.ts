import { fetchTranscript } from "youtube-transcript-plus";

export default async function handler(req: any, res: any) {
  const { videoId } = req.query;

  if (!videoId) return res.status(400).json({ error: "Missing videoId" });

  try {
    console.log("Fetching transcript for videoId:", videoId);
    const transcript = await fetchTranscript(videoId, { lang: "en" });
    console.log("Transcript fetched successfully", transcript);
    res.status(200).json({ transcript });
  } catch (err) {
    console.error("Transcript error:", err.message);
    res.status(500).json({ error: err.message });
  }
}