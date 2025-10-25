import { YoutubeTranscript } from "youtube-transcript-plus";

export default async function handler(req, res) {
  const { videoId } = req.query;

  if (!videoId) return res.status(400).json({ error: "Missing videoId" });

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    res.status(200).json({ transcript });
  } catch (err) {
    console.error("Transcript error:", err.message);
    res.status(500).json({ error: err.message });
  }
}